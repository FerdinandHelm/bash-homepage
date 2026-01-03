"use client";

import { createContext, useState, useEffect, useCallback, useRef, useContext } from "react";
import debounce from 'debounce';
import path from 'path';

import modules, { getModule } from './modules';
import filesystem from './filesystem';
import functions from './functions';

function importAll(r) { r.keys().forEach(r); }
importAll(require.context('modules', true, /\.js$/));
const loadedModules = Object.keys(modules);

const MACHINE = `\x1b[92;1mfreddie@homepage:\x1b[0m`;
const HOME_DIR = "/home/freddie";
const PROMPT = "$ ";

export const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  // CONSOLE RENDERING
  const [content, setContent] = useState("");
  const [formatQueue, addToConsole] = useState("");
  const [command, setCommand] = useState("");
  const commandRef = useRef(command);

  const hang = useRef(false);

  // FILE TREE
  const pwd = useRef(HOME_DIR);
  const pwdIdx = useRef(null);

  // HISTORY
  const history = useRef([]);
  const historyIndex = useRef(-1);

  // MUSIC PLAYER
  const [playlist, setPlaylist] = useState([]);

  // renders the format queue to the console with ANSI escape code formatting
  // debounced to only render 5 times per second
  const renderQueue = useCallback(debounce(() => {
    if(!formatQueue) return;

    

    let formattedText = formatQueue
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/(?!\x1b\[0m)\x1b\[38/g, '\x1b\[0m\x1b\[38') // add missing resets
      .replace(/\x1b\[(.*?);1m(.*?\x1b\[.*?m|$)/gm, '<span style="font-weight:bold">\x1b[$1m$2</span>') // bold combined resets
      .replace(/\x1b\[(.*?);3m(.*?\x1b\[.*?m|$)/gm, '<span style="font-style:italic">\x1b[$1m$2</span>') // italic combined resets
      .replace(/\x1b\[(.*?);4m(.*?\x1b\[.*?m|$)/gm, '<span style="text-decoration:underline">\x1b[$1m$2</span>') // underline combined resets
      .replace(/\x1b\[1m(.*?)(?=\x1b\[.*?m|$)/gm, '<span style="font-weight:bold">$1</span>') // bold
      .replace(/\x1b\[4m(.*?)(?=\x1b\[.*?m|$)/gm, '<span style="text-decoration:underline">$1</span>') // underline
      .replace(/\x1b\[3([0-7])m(.*?)(?=\x1b\[.*?m|$)/gm, `<span class="text-$1">$2</span>`) // text standard colors (see globals.css)
      .replace(/\x1b\[4([0-7])m(.*?)(?=\x1b\[.*?m|$)/gm, `<span class="bg-$1">$2</span>`) // background standard colors (see globals.css)
      .replace(/\x1b\[9([0-7])m(.*?)(?=\x1b\[.*?m|$)/gm, `<span class="text-hi-$1">$2</span>`) // text high-intensity colors (see globals.css)
      .replace(/\x1b\[10([0-7])m(.*?)(?=\x1b\[.*?m|$)/gm, `<span class="bg-hi-$1">$2</span>`) // background high-intensity colors (see globals.css)
      .replace(/\x1b\[([34])8;2;(\d+;\d+;\d+)m(.*?)(?=\x1b\[.*?m|$)/gm, (match, p1, p2, p3) => {
        const isBackground = (p1 === '4'); // 38=text, 48=background

        const rgb = p2.split(';').join(',');
        var color = `style="${isBackground ? 'background-color' : 'color'}: rgb(${rgb})"`;

        return `<span ${color}>${p3}</span>`;
      })
      .replace(/\x1b\[([34])8;5;(\d+)m(.*?)(?=\x1b\[.*?m|$)/gm, (match, p1, p2, p3) => {
        const isBackground = (p1 === '4'); // 38=text, 48=background

        if(p2 < 8) var color = `class="${isBackground ? 'bg' : 'text'}-${p2}"`; // 0-7: standard colors
        else if(p2 < 16) var color = `class="${isBackground ? 'bg' : 'text'}-hi-${p2-8}"`; // 8-15: high-intensity colors
        else if(p2 < 232) {
          const idx = p2 - 16;
          const r = Math.floor(idx / 36) * 51;
          const g = Math.floor((idx % 36) / 6) * 51;
          const b = (idx % 6) * 51;
          var color = `style="${isBackground ? 'background-color' : 'color'}: rgb(${r}, ${g}, ${b})"`;
        }
        else { // 232-255: grayscale
          const gray = (p2 - 232) * 10 + 8;
          var color = `style="${isBackground ? 'background-color' : 'color'}: rgb(${gray}, ${gray}, ${gray})"`;
        }

        return `<span ${color}>${p3}</span>`;
      })
      .replace(/\x1b\[0m/g, '') // reset

    addToConsole("");

    setContent(prev => {
      let newContent = prev + formattedText;
      if(newContent.includes('\b')) {
        while(formattedText.indexOf('\b') !== -1) {
          const bsIndex = formattedText.indexOf('\b');
          formattedText = formattedText.slice(0, bsIndex - 1) + formattedText.slice(bsIndex + 1);
        }

        // handle backspaces
        const chars = Array.from(newContent);
        const stack = [];
        for(const c of chars) {
          if(c === '\b') stack.pop();
          else stack.push(c);
        }
        newContent = stack.join('');
      }
      
      // only keep last 250 lines
      const lines = newContent.split("\n");
      if(lines.length > 250) {
        newContent = lines.slice(lines.length - 250).join("\n");
      }

      return newContent;
    });
  }, 200, {immediate: true}));
  useEffect(renderQueue, [formatQueue]);

  // adds text to the console along with a newline
  const echo = (text, newline = true) => {
    if (text === undefined) return;
    addToConsole(prev => prev + text + (newline ? "\n" : ""));
  };

  // adds a letter to the console
  const addLetter = char => {
    setCommand(prev => {
      const newCommand = prev + char;
      commandRef.current = newCommand;
      return newCommand;
    });

    // adds the letter to the shell directly for lag effect
    if(hang.current) setContent(prev => prev + char);
  };

  // removes a letter from the console
  const removeLetter = () => setCommand(c => {
    const newCommand = c.slice(0, -1);
    commandRef.current = newCommand;
    return newCommand;
  });

  // clears the console
  const clearConsole = () => {
    setContent("");
    addToConsole("");
  };

  // shows the prompt ready for typing
  const printPrompt = () => {
    const prompt = MACHINE + `\x1b[96m${pwd.current === HOME_DIR ? "~" : pwd.current}\x1b[0m` + PROMPT;
    addToConsole(prev => prev + prompt + '\0');
  };

  // public API
  // functions are either here or in api.js
  const api = { ...functions, ...filesystem, HOME_DIR, pwd, pwdIdx, playlist, setPlaylist, echo };

  // executes a command
  const executeCommand = async () => {
    if(hang.current) return setContent(prev => prev + "\n");

    const cmd = commandRef.current;

    setCommand("");
    commandRef.current = "";
    if(cmd && history.current[0] !== cmd) history.current.unshift(cmd);
    if(history.current.length > 100) history.current.pop();
    window.localStorage.setItem('history', JSON.stringify(history.current));
    historyIndex.current = -1;

    setContent(prev => prev + cmd + "\n");

    const args = cmd.split(" ").slice(1);
    const c = cmd.split(" ")[0].toLowerCase();

    switch (c) {
      case "":
        break;
      case "clear":
        clearConsole();
        break;
      case "all":
        echo(loadedModules.join(", "));
        break;
      case "whoami":
        echo("freddie");
        break;
      case "echo":
        echo(args.join(" "));
        break;
      case "pwd":
        echo(pwd.current);
        break;
      case "cd":
        const cdPath = args[0] ? path.resolve(pwd.current, args[0].replace(/^~/, HOME_DIR)) : HOME_DIR;
        try {
          const file = await api.getFile(cdPath);
          if(!file || file.type !== "dir") {
            echo(`cd: not a directory: ${args[0]}`);
            break;
          }
          pwd.current = cdPath;
          pwdIdx.current = file.id;
        } catch(error) {
          console.log(error);
          echo(`cd: no such file or directory: ${args[0]}`);
        }

        break;
      case "cat":
        if(!args[0]) break;
        const catPath = path.resolve(pwd.current, args[0].replace(/^~/, HOME_DIR));
        try {
          const file = await api.getFile(catPath);
          if(!file) {
            echo(`cat: no such file: ${args[0]}`);
            break;
          }
          if(file.type !== "file") {
            echo(`cat: ${args[0]}: Is a directory`);
            break;
          }
          console.log(file);
          if(file.content) echo(file.content, false);
        } catch(error) {
          console.log(error);
          echo(`cat: could not read file: ${args[0]}`);
        }
        break;
      default:
        if (loadedModules.includes(c)) {
          hang.current = true;
          await getModule(c)(api, args);
          hang.current = false;
        } else {
          echo(`Command not found: ${cmd}`);
        }
        break;
    }

    printPrompt();
  };

  const handleKeyPress = event => {
    if (hang.current && event.ctrlKey && event.key === 'c') {
      setContent(prev => prev + 'My bad, I haven\'t implemented ^C yet\n');
      return;
    }

    if (event.metaKey && event.key === 'k') {
      clearConsole();
      printPrompt();
      return;
    }

    // TODO add up/down arrow for command history
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === "Enter") executeCommand();
    else if (event.key === "Backspace") removeLetter();
    else if (event.key === "Tab") {
      event.preventDefault();
      // autocomplete
      const cmd = commandRef.current;
      let suggestions = [];

      // command name auto-complete
      if (!cmd.includes(" ")) {
        suggestions = loadedModules.filter(m => m.startsWith(cmd));
        
        if (suggestions.length === 1) {
          const newCommand = suggestions[0];
          setCommand(newCommand);
          commandRef.current = newCommand;
        }

        return;
      }

      // file path auto-complete
      const lastArg = cmd.substring(cmd.lastIndexOf(" ") + 1);
      const partialName = lastArg.endsWith('/') ? '' : path.basename(lastArg);
      let dirPath = lastArg.endsWith('/') ? lastArg : path.dirname(lastArg);
      dirPath = dirPath.replace(/^~/, HOME_DIR);
      dirPath = dirPath.startsWith('/') ? dirPath : path.resolve(pwd.current, dirPath);

      api.getDirectory(dirPath).then(files => {
        console.log(files, partialName);
        suggestions = files.filter(f => f.name.startsWith(partialName));
        console.log(suggestions);
        if (suggestions.length !== 1) return;

        console.log(lastArg);
        let newCommand = cmd.substring(0, Math.max(cmd.lastIndexOf(' '), cmd.lastIndexOf('/')) + 1) + suggestions[0].name;
        newCommand += (suggestions[0].type === 'dir' ? '/' : ' ');

        setCommand(newCommand);
        commandRef.current = newCommand;
      }).catch(err => {});

      return;
    }
    else if (event.key === "ArrowUp") {
      if (historyIndex.current < history.current.length - 1) {
        historyIndex.current++;
        setCommand(history.current[historyIndex.current]);
        commandRef.current = history.current[historyIndex.current];
      }
    } else if (event.key === "ArrowDown") {
      if (historyIndex.current > 0) {
        historyIndex.current--;
        setCommand(history.current[historyIndex.current]);
        commandRef.current = history.current[historyIndex.current];
      } else {
        historyIndex.current = -1;
        setCommand("");
        commandRef.current = "";
      }
    } else if (event.key.length === 1) addLetter(event.key);
  };

  useEffect(() => {
    filesystem.initFiles();

    getModule('motd')(api, {});

    if (localStorage.getItem("lastLogin")) {
      var lastLogin = new Date(parseInt(localStorage.getItem("lastLogin")));
      echo(`\nLast login: ${api.formatDate(lastLogin)} on ttys030\n`);
    }
    if (localStorage.getItem("history")) {
      history.current = JSON.parse(localStorage.getItem("history"));
    }

    localStorage.setItem("lastLogin", Date.now());
    printPrompt();

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <AppContext.Provider value={{content, command, hang, pwd, pwdIdx}}>
      {children}
      <button id="hiddenInput" style={{ position: 'fixed', top: '10px', right: '10px' }} onClick={() => addLetter('\b')} />
    </AppContext.Provider>
  );
}

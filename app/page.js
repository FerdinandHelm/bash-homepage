"use client";
import { useState, useEffect, useCallback, useRef, use } from "react";
import debounce from 'debounce';
import modules, { getModule } from './modules';

function importAll(r) { r.keys().forEach(r); }
importAll(require.context('commands', true, /\.js$/));
const validCommands = Object.keys(modules);

const name = Math.random() < 0.5 ? 'ferdi' : 'freddie';
const MACHINE = `\x1b[92;1m${name}@homepage:\x1b[0m`;
const FOLDER = "\x1b[96m~\x1b[0m";
const PROMPT = MACHINE + FOLDER + "$ ";

// ideas for more commands:
// - weather: shows current weather for a given location
// - screenfetch: shows fake screenfetch from user's user-agent


export default function Home() {
  // CONSOLE RENDERING
  const [content, setContent] = useState("");
  const [formatQueue, addToConsole] = useState("");
  const [command, setCommand] = useState("");
  const commandRef = useRef(command);

  const hang = useRef(false);

  // HISTORY
  const history = useRef([]);
  const historyIndex = useRef(-1);

  // SCROLL HANDLING FOR MOBILE
  const lastScrollY = useRef(0);
  const scrollAccumulator = useRef(0);

  // renders the format queue to the console with ANSI escape code formatting
  // debounced to only render 5 times per second
  const renderQueue = useCallback(debounce(() => {
    if(!formatQueue) return;

    let formattedText = formatQueue
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/(?!\x1b\[0m)\x1b\[38/g, '\x1b\[0m\x1b\[38') // add missing resets
      .replace(/\x1b\[(.*?);1m(.*?\x1b\[(.*?)m)/g, '<strong>\x1b[$1m$2</strong>') // bold combined resets
      .replace(/\x1b\[(.*?);3m(.*?\x1b\[(.*?)m)/g, '<em>\x1b[$1m$2</em>') // italic combined resets
      .replace(/\x1b\[(.*?);4m(.*?\x1b\[(.*?)m)/g, '<u>\x1b[$1m$2</u>') // underline combined resets
      .replace(/\x1b\[1m(.*?)(\x1b\[(.*?)m)/g, '<strong>$1</strong>$2') // bold
      .replace(/\x1b\[4m(.*?)(\x1b\[(.*?)m)/g, '<u>$1</u>$2') // underline
      .replace(/\x1b\[3([0-7])m(.*?)(\x1b\[(.*?)m)/g, `<span class="text-$1">$2</span>$3`) // text standard colors (see globals.css)
      .replace(/\x1b\[([34])8;2;(\d+;\d+;\d+)m(.*?)(\x1b\[(.*?)m)/g, (match, p1, p2, p3, p4) => {
        const isBackground = (p1 === '4'); // 38=text, 48=background

        const rgb = p2.split(';').join(',');
        var color = `style="${isBackground ? 'background-color' : 'color'}: rgb(${rgb})"`;

        return `<span ${color}>${p3}</span>${p4}`;
      })
      .replace(/\x1b\[([34])8;5;(\d+)m(.*?)(\x1b\[(.*?)m)/g, (match, p1, p2, p3, p4) => {
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

        return `<span ${color}>${p3}</span>${p4}`;
      })
      .replace(/\x1b\[4([0-7])m(.*?)(\x1b\[(.*?)m)/g, `<span class="bg-$1">$2</span>$3`) // background standard colors (see globals.css)
      .replace(/\x1b\[9([0-7])m(.*?)(\x1b\[(.*?)m)/g, `<span class="text-hi-$1">$2</span>$3`) // text high-intensity colors (see globals.css)
      .replace(/\x1b\[10([0-7])m(.*?)(\x1b\[(.*?)m)/g, `<span class="bg-hi-$1">$2</span>$3`) // background high-intensity colors (see globals.css)
      .replace(/\x1b\[(0|39|49)m/g, '') // reset

    addToConsole("");

    setContent(prev => {
      let newContent = prev + formattedText;
      
      // only keep last 250 lines
      const lines = newContent.split("\n");
      if(lines.length > 250) {
        newContent = lines.slice(lines.length - 250).join("\n");
      }

      return newContent;
    });
  }, 200, {immediate: true}));
  useEffect(renderQueue, [formatQueue]);

  // scrolls to the bottom when content changes
  const scrollToPrompt = () => {
    setTimeout(() => {
      if(window.visualViewport.height < window.innerHeight) // phone with virtual keyboard open
        window.scrollTo(0, document.getElementById('console').offsetHeight - window.visualViewport.height + 10, { behavior: 'smooth' });
      else
        window.scrollTo(0, document.getElementById('console').offsetHeight);
    }, 50);
  };
  useEffect(scrollToPrompt, [content, command]);

  // TODO doesn't work yet
  const hideKeyboardOnScrollUp = () => {
    if (typeof window === "undefined" || !lastScrollY.current) return;

    const y = window.scrollY;
    const scrolling = y - lastScrollY.current;

    if (scrolling < 0) { // user is scrolling down
      upAccumulator.current = 0;
      return;
    }

    upAccumulator.current += -scrolling;
    if (upAccumulator.current < 50) {
      const hiddenInput = document.getElementById('hiddenInput');
      if (hiddenInput) hiddenInput.blur();
      upAccumulator.current = 0;
    }

    lastScrollY.current = y;
  };

  // adds text to the console along with a newline
  const echo = text => {
    if (text === undefined) return;
    addToConsole(prev => prev + text + "\n");
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
  const printPrompt = () => addToConsole(prev => prev + PROMPT + '\0');

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
        printPrompt();
        break;
      case "clear":
        clearConsole();
        printPrompt();
        break;
      case "all":
        echo(validCommands.join(", "));
        printPrompt();
        break;
      default:
        if (validCommands.includes(c)) {
          hang.current = true;
          await getModule(c)(echo, args);
          console.log('setting hang to false'); 
          hang.current = false;
          printPrompt();
        } else {
          echo(`Command not found: ${cmd}`);
          printPrompt();
        }
        break;
    }
  };

  const handleKeyPress = event => {
    if (hang.current && event.ctrlKey && event.key === 'c') {
      setContent(prev => prev + 'My bad, I haven\'t implemented ^C yet\n');
    }

    // TODO add up/down arrow for command history
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === "Enter") executeCommand();
    else if (event.key === "Backspace") removeLetter();
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

  const formatDate = (date = new Date()) => {
    const d = new Date(date);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let formattedDate = `${weekdays[d.getDay()]} ${months[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}`;
    formattedDate += ` ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
    if(d.getFullYear() !== new Date().getFullYear()) {
      formattedDate += ` ${d.getFullYear()}`;
    }
    return formattedDate;
  };

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    getModule('motd')(echo, {});

    if (localStorage.getItem("lastLogin")) {
      var lastLogin = new Date(parseInt(localStorage.getItem("lastLogin")));
      echo(`\nLast login: ${formatDate(lastLogin)} on ttys030\n`);
    }
    if (localStorage.getItem("history")) {
      history.current = JSON.parse(localStorage.getItem("history"));
    }

    localStorage.setItem("lastLogin", Date.now());
    printPrompt();

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener('scroll', hideKeyboardOnScrollUp, { passive: true });
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener('scroll', hideKeyboardOnScrollUp);
    };
  }, []);

  return (
    <div className="console-container">
      <pre
        id="console"
        dangerouslySetInnerHTML={{ __html: content + (hang.current ? "" : commandRef.current) }}
        onTouchEnd={() => document.getElementById("hiddenInput").focus()}
      />

      <input
        type="text"
        id="hiddenInput"
        onFocus={() => setTimeout(scrollToPrompt, 50)}
        onBlur={e => e.target.focus()}
        autoFocus
      />
    </div>
  );
}

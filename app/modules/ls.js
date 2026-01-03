import { useContext } from 'react';
import path from 'path';

import { importModule } from '../modules';
import { AppContext } from '../app';

// module's command will be read from filename
// 1st arg: API
// 2nd arg: command arguments array
importModule(import.meta.url, async function({ echo, getFlagsFromArgs, getDirectory, humanFileSize, HOME_DIR, pwd, pwdIdx }, args) {
  const flags = getFlagsFromArgs(args);
  const lsPath = args[0] ? path.resolve(pwd.current, args[0].replace(/^~/, HOME_DIR)) : pwd.current;

  try {
    const files = await getDirectory(pwdIdx.current || lsPath);
    files.sort((a, b) => a.name.localeCompare(b.name));

    if(!files.length) return 0;
    if(!flags.a) {
      // filter out hidden files
      for(let i = files.length - 1; i >= 0; i--) {
        if(files[i].name.startsWith('.')) files.splice(i, 1);
      }
    } else {
      files.unshift({name: '..', type: 'dir', owner: files[0].owner || 'root@root'});
      files.unshift({name: '.', type: 'dir', owner: files[0].owner || 'root@root'});
    }
    if(flags.l) {
      echo(`total ${files.length}`);
      files.forEach(f => {
        const bytes = f.size || f.content?.length || 0;
        const size = flags.h ? humanFileSize(bytes) : bytes;
        let line = '';
        line += (f.type === 'dir' ? 'd' : '-') + (f.permission || 'rwxr-xr-x') + '   ';
        line += (f.owner || 'root@root').replace('@', '  ') + '  ';
        line += size.toString().padStart(6, ' ') + ' ';
        line += f.name;
        echo(line);
      });
      return 0;
    }
    echo(files.map(f => f.name).join("  "));
  } catch(error) {
    console.log(error);
    echo(`ls: could not list directory`);
  }

  return 0;
});
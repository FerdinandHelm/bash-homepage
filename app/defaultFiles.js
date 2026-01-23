const defaultFiles = {name: '/', type: 'dir', content: []};

defaultFiles.content = [

  {name: 'bin', type: 'dir', content: [
      '[','bash','cat','chmod','cp','csh','dash','date','dd','df',
      'echo','ed','expr','hostname','kill','ksh','launchctl','link','ln','ls',
      'mkdir','mv','pax','ps','pwd','realpath','rm','rmdir','sh','sleep',
      'stty','sync','tcsh','test','unlink','wait4path','zsh'
    ].map(file => ({name: file, type: 'bin', size: Math.random() * 50000 + 100000}))},

  {name: 'boot', type: 'dir', content: []},

  {name: 'dev', type: 'dir', content: [
    {name: 'core', type: 'bin'},
    {name: 'fd', type: 'dir', content: [
      {name: '0', type: 'bin'},
      {name: '1', type: 'bin'},
      {name: '2', type: 'bin'},
      {name: '3', type: 'bin'},
    ]},
    {name: 'full', type: 'bin'},
    {name: 'mqueue', type: 'dir', content: []},
    {name: 'null', type: 'bin'},
    {name: 'ptmx', type: 'bin'},
    {name: 'pts', type: 'dir', content: [
      {name: '0', type: 'bin'},
      {name: 'ptmx', type: 'bin'},
    ]},
    {name: 'random', type: 'bin'},
    {name: 'shm', type: 'dir', content: []},
    {name: 'stderr', type: 'bin'},
    {name: 'stdin', type: 'bin'},
    {name: 'stdout', type: 'bin'},
    {name: 'tty', type: 'bin'},
    {name: 'urandom', type: 'bin'},
    {name: 'zero', type: 'bin'},
  ]},

  // todo
  {name: 'etc', type: 'dir', content: [
    {name: 'passwd', type: 'file', content:`root:x:0:0:root:/root:/bin/bash\nfreddie:x:1000:1000:Freddie,,,:/home/freddie:/bin/bash\n`},
    {name: 'hosts', type: 'file', content: `127.0.0.1 localhost\n::1 localhost\n`},
    {name: 'hostname', type: 'file', content: 'homepage.local\n'},
  ]},

  {name: 'home', type: 'dir', content: [
    {name: 'freddie', type: 'dir', owner: 'freddie@freddie', content: [
      {name: 'secrets.txt', type: 'file', owner: 'freddie@freddie', permission: 'rw-------', content: "This file is very secret! My password on every website is Passw0rd!\nBtw if you have an idea for a cool project, type in 'skipschool'"},
      {name: 'todo.txt', type: 'file', owner: 'freddie@freddie', permission: 'rw-r--r--', content: "- laundry\n- buy toilet paper\n- take more trains\n"},
    ]},
  ]},

  {name: 'lib', type: 'dir', content: []},

  {name: 'media', type: 'dir', content: []},

  {name: 'mnt', type: 'dir', content: []},

  {name: 'opt', type: 'dir', content: []},

  {name: 'proc', type: 'dir', content: []},

  {name: 'root', type: 'dir', content: []},

  {name: 'run', type: 'dir', content: [
    {name: 'lock', type: 'dir', content: []},
  ]},

  {name: 'sbin', type: 'dir', content: []},

  {name: 'srv', type: 'dir', content: []},

  {name: 'sys', type: 'dir', content: [
    {name: 'block', type: 'dir', content: []},
    {name: 'bus', type: 'dir', content: []},
    {name: 'class', type: 'dir', content: []},
    {name: 'dev', type: 'dir', content: []},
    {name: 'devices', type: 'dir', content: []},
    {name: 'firmware', type: 'dir', content: []},
    {name: 'fs', type: 'dir', content: []},
    {name: 'kernel', type: 'dir', content: []},
    {name: 'module', type: 'dir', content: []},
  ]},

  {name: 'tmp', type: 'dir', content: [
    {name: 'super_unimportant', type: 'file', content: "Let me know you found this file, I'll get you a drink of your choice\n"},
  ]},

  {name: 'usr', type: 'dir', content: [
    {name: 'bin', type: 'dir', content: []},
    {name: 'games', type: 'dir', content: []},
    {name: 'include', type: 'dir', content: []},
    {name: 'lib', type: 'dir', content: []},
    {name: 'libexec', type: 'dir', content: []},
    {name: 'local', type: 'dir', content: [
      {name: 'bin', type: 'dir', content: []},
      {name: 'etc', type: 'dir', content: []},
      {name: 'games', type: 'dir', content: []},
      {name: 'include', type: 'dir', content: []},
      {name: 'lib', type: 'dir', content: []},
      {name: 'sbin', type: 'dir', content: []},
      {name: 'share', type: 'dir', content: []},
      {name: 'src', type: 'dir', content: []},
    ]},
    {name: 'opt', type: 'dir', content: [
    ]},
    {name: 'sbin', type: 'dir', content: []},
    {name: 'share', type: 'dir', content: []},
    {name: 'src', type: 'dir', content: []},
  ]},

  {name: 'var', type: 'dir', content: []},

];

export default defaultFiles;
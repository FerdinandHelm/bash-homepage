export const getFlagsFromArgs = (args) => {
  const flags = {};

  while(args[0] && args[0].startsWith('-')) {
    if(args[0].startsWith('--')) {
      if(args[0].includes('=')) {
        const [flag, value] = args[0].slice(2).split('=');
        flags[flag] = value;
      }
      else flags[args[0].slice(2)] = true;

      args.shift();
      continue;
    }

    for (const flag of args[0].slice(1)) {
      flags[flag] = true;
    }
    
    args.shift();
  }

  return flags;
}

export const sleep = ms => new Promise(res => setTimeout(res, ms));

export const openTab = url => {
  const btn = document.createElement('button');
  btn.style.display = 'none';
  btn.onclick = () => {
    window.open(url, '_blank');
  };
  document.body.appendChild(btn);
  btn.click();
  document.body.removeChild(btn);
};

export const formatDate = (date = new Date()) => {
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

export const humanFileSize = (size) => {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const sizes = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
  return (size / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
};

export default { getFlagsFromArgs, sleep, openTab, formatDate, humanFileSize };
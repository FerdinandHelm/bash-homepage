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

export default { sleep, openTab, formatDate };
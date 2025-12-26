import { importModule } from '../modules';

// module's command will be read from filename
// 1st arg: API
// 2nd arg: command arguments array
importModule(import.meta.url, async function({ echo, sleep, openTab, formatDate }, args) {
  // add code here

  return 0;
});
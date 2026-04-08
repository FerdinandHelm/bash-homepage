import { importModule } from '../modules';

importModule(import.meta.url, async function({ echo, sleep }) {
  echo("Don't look too closely at my CSS");
  await sleep(2000);
  window.open("https://github.com/FerdinandHelm");
  return 0;
});
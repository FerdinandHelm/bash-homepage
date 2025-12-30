import { importModule } from '../modules';

importModule(import.meta.url, async function({ echo, sleep }) {
  echo("Thanks for passing by :)");
  echo("This window will self-destruct in 3 seconds...");
  await sleep(3000);
  window.close();
  return 0;
});
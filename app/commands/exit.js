import { importModule } from '../modules';
import { delay } from '../utils';

importModule(import.meta.url, async function({ echo }) {
  echo("Thanks for passing by :)");
  echo("This window will self-destruct in 3 seconds...");
  await delay(3000);
  window.close();
  return 0;
});
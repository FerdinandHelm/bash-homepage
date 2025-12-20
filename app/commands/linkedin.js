import { importModule } from '../modules';
import { delay } from '../utils';

importModule(import.meta.url, async function({ echo }) {
  echo("I don't really check my LinkedIn too often, but you can still reach out to me there!");
  await delay(2000);
  window.open("https://www.linkedin.com/in/ferdinand-helm-berlin/");
  return 0;
});
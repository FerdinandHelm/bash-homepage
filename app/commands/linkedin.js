import { importModule } from '../modules';

importModule(import.meta.url, async function({ echo, sleep }) {
  echo("I don't really check my LinkedIn too often, but you can still reach out to me there!");
  await sleep(2000);
  window.open("https://www.linkedin.com/in/ferdinand-helm-berlin/");
  return 0;
});
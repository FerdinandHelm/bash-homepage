import { importModule } from '../modules';
import { delay } from '../utils';

importModule(import.meta.url, async function({ echo }) {
  echo("I really recommend the Blue Mountain!");
  await delay(2000);
  window.open("https://vernissagecoffee.com/");
  return 0;
});
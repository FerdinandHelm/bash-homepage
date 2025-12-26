import { importModule } from '../modules';

importModule(import.meta.url, async function({ echo, sleep }) {
  echo("I really recommend the Blue Mountain!");
  await sleep(2000);
  window.open("https://vernissagecoffee.com/");
  return 0;
});
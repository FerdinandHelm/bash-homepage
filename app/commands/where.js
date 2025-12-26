import { importModule } from '../modules';

importModule(import.meta.url, async function({ echo, sleep }) {
  echo("This is a little thingy I made for my road trip in 2023/24, might not be up to date");
  await sleep(2000);
  window.open("https://whereisfreddie.today");
  return 0;
});
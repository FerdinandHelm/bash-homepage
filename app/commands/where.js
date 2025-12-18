import { importModule } from '../modules';
import delay from '../delay';

importModule(import.meta.url, async function(echo, args) {
  echo("This is a little thingy I made for my road trip in 2023/24, might not be up to date");
  await delay(2000);
  window.open("https://whereisfreddie.today");
  return 0;
});
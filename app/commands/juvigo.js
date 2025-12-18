import { importModule } from '../modules';
import delay from '../delay';

importModule(import.meta.url, async function(echo, args) {
  echo("We're operating in 9 countries, just pick one and browse around!");
  await delay(2000);
  window.open("https://juvigo.xyz/", "_blank");
  return 0;
});
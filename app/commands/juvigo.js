import { importModule } from '../modules';
import { delay, openTab } from '../utils';

importModule(import.meta.url, async function({ echo }) {
  echo("We're operating in 9 countries, just pick one and browse around!");
  await delay(2000);
  openTab("https://juvigo.xyz/");
  return 0;
});
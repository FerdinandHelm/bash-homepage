import { importModule } from '../modules';

importModule(import.meta.url, async function({ echo, sleep, openTab }) {
  echo("We're operating in 9 countries, just pick one and browse around!");
  await sleep(2000);
  openTab("https://juvigo.xyz/");
  return 0;
});
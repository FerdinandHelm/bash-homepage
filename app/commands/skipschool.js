import { importModule } from '../modules';

importModule(import.meta.url, async function(echo, args) {
  window.open("https://juvigo.xyz/skip");
  return 0;
});
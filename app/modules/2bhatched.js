import { importModule } from '../modules';

importModule(import.meta.url, async function() {
  window.open("https://juvigo.xyz/skip");
  return 0;
});
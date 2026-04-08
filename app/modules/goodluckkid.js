import { importModule } from '../modules';

importModule(import.meta.url, async function({ openTab }) {
  openTab("https://goodluckkid.de/");
  return 0;
});
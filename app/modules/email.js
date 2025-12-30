import { importModule } from '../modules';

importModule(import.meta.url, async function({ echo, sleep }) {
  echo("You can email me at ferdinand@helm.berlin!");
  await sleep(2000);
  window.location.href = "mailto:ferdinand@helm.berlin";
  return 0;
});
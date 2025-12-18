import { importModule } from '../modules';
import delay from '../delay';

importModule(import.meta.url, async function(echo, args) {
  echo("You can email me at ferdinand@helm.berlin!");
  await delay(2000);
  window.location.href = "mailto:ferdinand@helm.berlin";
  return 0;
});
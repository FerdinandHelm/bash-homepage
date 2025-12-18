import { importModule } from '../modules';

importModule(import.meta.url, async function(echo, args) {
  echo(`Here's some commands you can try: \x1b\[1mcv, contact, projects, weather, moon, clear\x1b\[0m`);
  echo("Or type 'all' to see a full list of available commands.");
  return 0;
});
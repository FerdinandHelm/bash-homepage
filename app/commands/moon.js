import { importModule } from '../modules';

importModule(import.meta.url, async function({ echo }) {
  echo("Loading moon...");
  try {
    const data = await fetch('https://wttr.in/Moon?A');
    let text = await data.text();

    echo('\n'+text);
    echo("Moon displayed using the amazing wttr.in <3");
    return 0;
  } catch (error) {
    echo("Could not fetch moon data.");
    return 1;
  }
});
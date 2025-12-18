import { importModule } from '../modules';

importModule(import.meta.url, async function(echo, args) {
  const location = args.length ? args.join("%20") : 'Berlin';

  if(!args.length) {
    echo("Did you know you can also add a location? Just type 'weather [location]' to get the weather for a specific place.");
  }

  echo("Loading weather...");

  const smallScreen = typeof window !== 'undefined' && window.innerWidth < 1100;

  try {
    const data = await fetch(`https://wttr.in/${location}?${smallScreen ? '0' : ''}A`);
    let text = await data.text();

    echo('\n'+text);
    if(smallScreen) {
      echo("For more detailed information, launch this on a bigger screen.");
    }
    echo("Weather displayed using the amazing wttr.in <3");
    return 0;
  } catch (error) {
    echo("Could not fetch weather data.");
    return 1;
  }
});
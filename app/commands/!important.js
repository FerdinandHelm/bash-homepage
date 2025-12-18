import { importModule } from '../modules';
import delay from '../delay';

importModule(import.meta.url, async function(echo, args) {
  echo("We're also on Apple Music and all other streaming platforms, but here's our Spotify:");
  await delay(2000);
  window.open("https://open.spotify.com/artist/3yKiXT6u16WQdmfDCL8vz6");
  return 0;
});
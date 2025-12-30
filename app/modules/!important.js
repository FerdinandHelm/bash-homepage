import { importModule } from '../modules';

importModule(import.meta.url, async function({ echo, sleep }) {
  echo("We're also on Apple Music and all other streaming platforms, but here's our Spotify:");
  await sleep(2000);
  window.open("https://open.spotify.com/artist/3yKiXT6u16WQdmfDCL8vz6");
  return 0;
});
import { importModule } from '../modules';

const musicTracks = ['arcade', 'plingplong'];

importModule(import.meta.url, async function({ echo, setPlaylist }, args) {
  if(!args.length) {
    setPlaylist(musicTracks);
    echo("Playing background music!");
    echo("Type 'music stop' to stop. Type music [track] to play a specific track.");
    return 0;
  }

  const trackName = args.join(' ');

  if (trackName.toLowerCase() === "stop") {
    setPlaylist([]);
    echo("Music stopped.");
    return 0;
  }

  if (!musicTracks.includes(trackName)) {
    echo(`Unknown track: ${trackName}`);
    echo(`Available tracks: ${musicTracks.join(", ")}`);
    return 0;
  }

  setPlaylist([trackName]);
  echo(`Playing ${trackName}...`);
  echo("Type 'music stop' to stop.");
  return 0;
});
"use client";
import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "./app";

export default function MusicPlayer() {
  const app = useContext(AppContext);

  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(null);

  const playPause = () => {
    console.log(playerRef.current);
    if(isPlaying) {
      playerRef.current?.pause();
      setIsPlaying(false);
    } else {
      playerRef.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    playerRef.current.play();
    setIsPlaying(true);
    const nextTrack = () => {
      app.setPlaylist(app.playlist.slice(1));
      playerRef.current.load();
    };
    playerRef.current.addEventListener("ended", nextTrack);
  }, [app.playlist, playerRef]);

  return (
    <div id="musicPlayer">
      <button onClick={playPause}>
        {isPlaying ? '\u23F8' : '\u23F5'}
      </button>

      <div>now playing:</div>
      <div><strong>{app.playlist[0]}</strong></div>

      <audio ref={playerRef} src={`/${app.playlist[0]}.m4a`} type="audio/mp4">
        Your browser does not support audio playback.
      </audio>
    </div>
  );
}
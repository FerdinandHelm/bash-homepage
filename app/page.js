"use client";
import { useEffect, useRef, useContext } from "react";
import { AppContext } from "./app";
import MusicPlayer from "./player";

// ideas for more commands:
// - weather: shows current weather for a given location
// - screenfetch: shows fake screenfetch from user's user-agent


export default function ConsolePage() {
  const app = useContext(AppContext);

  // SCROLL HANDLING FOR MOBILE
  const lastScrollY = useRef(0);
  const scrollAccumulator = useRef(0);

  // scrolls to the bottom when content changes
  const scrollToPrompt = () => {
    lastScrollY.current = window.scrollY;

    const c = document.getElementById('console');
    if (!c) return;

    setTimeout(() => {
      if(window.visualViewport.height < window.innerHeight) // phone with virtual keyboard open
        window.scrollTo(0, c.offsetHeight - window.visualViewport.height + 10, { behavior: 'smooth' });
      else
        window.scrollTo(0, c.offsetHeight);
    }, 50);
  };
  useEffect(scrollToPrompt, [app?.content, app?.command]);

  // TODO doesn't work yet
  const hideKeyboardOnScrollUp = () => {
    if (typeof window === "undefined" || !lastScrollY.current) return;

    const y = window.scrollY;
    const scrolling = y - lastScrollY.current;

    if (scrolling < 0) { // user is scrolling down
      scrollAccumulator.current = 0;
      return;
    }

    scrollAccumulator.current += -scrolling;
    if (scrollAccumulator.current < 50) {
      const hiddenInput = document.getElementById('hiddenInput');
      if (hiddenInput) hiddenInput.blur();
      scrollAccumulator.current = 0;
    }

    lastScrollY.current = y;
  };

  useEffect(() => {
    window.addEventListener('scroll', hideKeyboardOnScrollUp, { passive: true });
    return () => {
      window.removeEventListener('scroll', hideKeyboardOnScrollUp);
    };
  }, []);

  if(!app) return <div />;

  return (
    <div className="console-container">
      <pre
        id="console"
        dangerouslySetInnerHTML={{ __html: app.content + (app.hang.current ? "" : app.command) }}
        onTouchEnd={() => document.getElementById("hiddenInput").focus()}
      />
      <input
        type="text"
        id="hiddenInput"
        onFocus={() => setTimeout(scrollToPrompt, 50)}
        onBlur={e => e.target.focus()}
        autoFocus
      />
      {app.playlist?.length > 0 && <MusicPlayer />}
    </div>
  );
}

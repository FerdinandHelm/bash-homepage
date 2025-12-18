import { importModule } from '../modules';

importModule(import.meta.url, async function(echo, args) {
  echo("My projects are just as all-over-the-place as I am :D Here are some of them:\n");
  
  echo('Juvi\x1b\[38;2;249;148;32;1mgo\x1b\[0m');
  echo('\x1b\[38;5;63;1mJuvi\x1b\[38;5;214;1mgo\x1b\[0m');

  echo('Europe\'s biggest booking platform for holiday camps and language trips. We started it in 2015 and are now operating in 9 countries. Since 2022, we\'re also organizing our own Juvigo language trips to England, Malta and other great destinations.\n');
  echo('Together with my team, I built and managed the website and IT infrastructure of the company and designed and built a custom CMS and CRM system. Over the past decade, we helped bring Europe\'s youth tourism industry into the 21st century. I also got to learn some languages and made a lot of friends <3');

  echo('If you wanna learn more, type \x1b\[1m\'juvigo\'\x1b\[0m!\n\n');

  echo('\x1b\[38;5;230;1mVernissage Coffee\x1b\[0m');

  echo('Art meets coffee. We\'re working together with local coffee farmers to offer unique specialty coffee freshly roasted to you.\n');
  echo('At the moment, we only ship to Germany, but that might change soon!');
  echo('If you\'re interested, type \x1b\[1m\'coffee\'\x1b\[0m!\n\n');

  // echo('\x1b\[1mSkipSchool\x1b\[0m');
  // echo('Building on all my learnings from Juvigo, I\'m starting SkipSchool in 2026. If you want to start your own company, you can get ')
  // echo('If you\'re interested, type \'skipschool\'!\n\n');

  echo('\x1b\[38;5;153;1mWhere Is Freddie Today?\x1b\[0m');
  echo('Small little web app I built to track my travels in 2023/24. Accompanied by a native iOS app that pings my location to a server regularly and offers an interface and sharing extensions to quickly send a photo/song to the site with one tap. Might come back to life in the future.');
  echo('To see it in action, type \x1b\[1m\'where\'\x1b\[0m\n\n');

  echo('\x1b\[38;5;147;1m!important\x1b\[0m');
  echo('DnB with friends. Definitely stay tuned for this one.');
  echo('Type \x1b\[1m\'!important\'\x1b\[0m to check us out on Spotify.\n\n');

  echo('\x1b\[38;5;190;1mThis site\x1b\[0m');
  echo('Another fun side project. I wanted to recreate a Unix shell with Next.js, with support for ANSI escape codes and all its quirks. Also gonna update this regularly and add new fun things\n');
  // echo('If you want to see something cool, type ???');

  echo('There\'s a lot more that I can\'t talk about yet, so stay tuned!');
  return 0;
});
import { importModule } from '../modules';

importModule(import.meta.url, async function(echo, args) {
  echo("I'm always happy to connect!");
  echo("I speak a few languages to varying degrees, including English, Dutch, German, French, Spanish, and Italian.");
  echo("So feel free to contact me in whatever language you're most comfortable in!");
  echo("Type 'email' or 'linkedin' to get in touch.");

  return 0;
});
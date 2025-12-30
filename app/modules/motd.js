import { importModule } from '../modules';

importModule(import.meta.url, async function({ echo }) {
  const ageDate = new Date(Date.now() - new Date(1998, 5, 22));
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  echo('\x1b[91m /##   /## \x1b[93m           \x1b[92m           \x1b[95m /##');
  echo('\x1b[91m| ##  | ## \x1b[93m           \x1b[92m           \x1b[95m| ##');
  echo('\x1b[91m| ##  | ## \x1b[93m  /######  \x1b[92m /##   /## \x1b[95m| ##');
  echo('\x1b[91m| ######## \x1b[93m /##__  ## \x1b[92m| ##  | ## \x1b[95m| ##');
  echo('\x1b[91m| ##__  ## \x1b[93m| ######## \x1b[92m| ##  | ## \x1b[95m|__/');
  echo('\x1b[91m| ##  | ## \x1b[93m| ##_____/ \x1b[92m| ##  | ## \x1b[95m    ');
  echo('\x1b[91m| ##  | ## \x1b[93m|  ####### \x1b[92m|  ####### \x1b[95m /##');
  echo('\x1b[91m|__/  |__/ \x1b[93m \\_______/\x1b[92m  \\____  ## \x1b[95m|__/');
  echo('                      \x1b[92m /##  | ##');
  echo('                      \x1b[92m|  ######/');
  echo('                      \x1b[92m \\______/');
  echo("I'm Ferdinand Helm, but you can call me \x1b\[1mFreddie\x1b\[0m.");
  echo(`I'm ${age} years old and I live in Berlin, Germany.`);
  echo('Welcome to my website!\n');
  echo("To get started, try typing \x1b[1mhelp\x1b[0m and hit enter to see what commands are available.");

  return 0;
});
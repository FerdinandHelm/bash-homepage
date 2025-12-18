import { importModule } from '../modules';

importModule(import.meta.url, async function(echo, args) {
  const ageDate = new Date(Date.now() - new Date(1998, 5, 22));
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  echo('HHHHHHHHH     HHHHHHHHH  iiii   !!! ');
  echo('H:::::::H     H:::::::H i::::i !!:!!');
  echo('H:::::::H     H:::::::H  iiii  !:::!');
  echo('HH::::::H     H::::::HH        !:::!');
  echo('  H:::::H     H:::::H  iiiiiii !:::!');
  echo('  H:::::H     H:::::H  i:::::i !:::!');
  echo('  H::::::HHHHH::::::H   i::::i !:::!');
  echo('  H:::::::::::::::::H   i::::i !:::!');
  echo('  H:::::::::::::::::H   i::::i !:::!');
  echo('  H::::::HHHHH::::::H   i::::i !:::!');
  echo('  H:::::H     H:::::H   i::::i !!:!!');
  echo('  H:::::H     H:::::H   i::::i  !!! ');
  echo('HH::::::H     H::::::HHi::::::i     ');
  echo('H:::::::H     H:::::::Hi::::::i !!! ');
  echo('H:::::::H     H:::::::Hi::::::i!!:!!');
  echo('HHHHHHHHH     HHHHHHHHHiiiiiiii !!!\n');
  echo("I'm Ferdinand Helm, but you can call me \x1b\[1mFreddie\x1b\[0m or Ferdi.");
  echo(`I'm ${age} years old and I live in Berlin, Germany.`);
  echo('Welcome to my website!\n');
  echo("To get started, type \x1b[1mhelp\x1b[0m and hit enter to see available commands.");

  return 0;
});
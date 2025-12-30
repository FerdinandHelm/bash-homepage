import { importModule } from '../modules';

importModule(import.meta.url, async function({ echo }) {
  const ageDate = new Date(Date.now() - new Date(1998, 5, 22));
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  echo('Born \x1b[1mJune 22, 1998\x1b[0m (this is not my PIN code, don\'t worry)');
  echo('Based in \x1b[1mBerlin, Germany\x1b[0m');
  echo('But you also find me a lot in \x1b[91mR\x1b[0mom\x1b[32me\x1b[0m and the \x1b[38;5;220mNetherlands\x1b[0m.');
  echo('If you want to know where I am right now, type \'\x1b[1mwhere\x1b[0m\'');

  echo('\n\x1b\[1mEducation:\x1b\[0m');
  echo('- 2013-2015: Abitur at Rosa-Luxemburg-Gymnasium, Berlin');
  echo('- 2016-2017: Studied Computer Science at TU Berlin');
  echo('- 2017-2018: Studied Applied Computer Science at FSU Jena');

  echo('\n\x1b\[1mLanguages I speak (in order of fluency):\x1b\[0m');
  echo('🇩🇪 German');
  echo('🇬🇧 English');
  echo('🇳🇱 Dutch');
  echo('🍕 Italian');
  echo('🥖 French');
  echo('🇪🇸 Spanish');
  echo('🇯🇵 Japanese');
  echo('I can also read/write Cyrillic and Arabic, in case you need that for some obscure project.');

  echo('\n\x1b\[1mProjects:\x1b\[0m');
  echo('Type \'projects\' to see a list of my projects.');

  echo('\n\x1b\[1mLectures:\x1b\[0m');
  echo('I do talks sometimes! Type \'talks\' to see a list of my past talks.');

  echo('\n\x1b\[1mContact:\x1b\[0m');
  echo('Type \'contact\' for my contact information.');

  return 0;
});
import { importModule } from '../modules';

importModule(import.meta.url, async function({ echo }) {
  echo('I sometimes do talks or guest lectures, mostly about Juvigo! Here are some of my past talks:');
  echo('\x1b\[1m2025-12-17\x1b\[0m: Hochschule Stralsund (Search Engines vs LLMs)');
  echo('\x1b\[1m2025-12-11\x1b\[0m: Hochschule Harz (How to build an online booking platform)');
  echo('\x1b\[1m2025-01-20\x1b\[0m: Hochschule für nachhaltige Entwicklung Eberswalde (Building a sustainable business in tourism)');
  echo('\x1b\[1m2022-10-18\x1b\[0m: Hochschule Görlitz/Zittau (SEO Case Study Juvigo)');
  echo('\x1b\[1m2018-03-07\x1b\[0m: ITB Berlin (Digitalization of the Youth Travel Industry)');
  return 0;
});
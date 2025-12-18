const modules = {};

export function importModule(url, module) {
  const name = new URL(url).pathname.split("/").pop().replace(/\.js$/, '')
  modules[name] = module;
}

export function getModule(name) {
  return modules[name];
}

export default modules;
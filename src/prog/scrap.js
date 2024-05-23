/** @param {NS} ns */
export async function main(ns) {
  const homePS = ns.ps('home');
  for (let script of homePS) {
    ns.tprint(`${script.filename}:${script.pid}`);
  }
  ns.tprint(`${ns.getScriptName()}:${ns.pid}`);
}

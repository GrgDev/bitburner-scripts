/** @param {NS} ns */
export async function main(ns) {
  /**
   * Magic security modifier constants:
   * 	  hack: +0.002 security per thread
   * 	  grow: +0.004 security per thread
   * 	weaken: -0.05 security per thread
   */
  if (ns.args.length != 1) {
    ns.print('Error: Incorrect Usage!\tUsage: run prep.js <server-name>');
    return 1;
  }
  const targetServer = ns.getServer(ns.args[0]);
  let currentSecurity = targetServer.hackDifficulty;
  const minSecurity = targetServer.minDifficulty;
}

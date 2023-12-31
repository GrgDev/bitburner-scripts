/** @param {NS} ns */
export async function main(ns) {
  var output = '\nSERVER REPORT:';
  const targetServerName = String(ns.args[0]);
  const doesServerExist = ns.serverExists(targetServerName);
  output += '\n\tExists?:\t\t\t' + doesServerExist;
  if (!doesServerExist) {
    ns.tprint(output);
    ns.print(output);
    return;
  }
  const targetServer = ns.getServer(targetServerName);
  const hf = ns.formulas.hacking;
  output += '\n\tgrowTime():\t\t' + hf.growTime(targetServer, ns.getPlayer());
  output += '\n\thackTime():\t\t' + hf.hackTime(targetServer, ns.getPlayer());
  output += '\n\tweakenTime():\t\t' + hf.weakenTime(targetServer, ns.getPlayer());
  output += '\n\thackChance():\t\t' + hf.hackChance(targetServer, ns.getPlayer());
  output += '\n\thackExp():\t\t' + hf.hackExp(targetServer, ns.getPlayer());
  output += '\n\tgrowPercent():\t\t' + hf.growPercent(targetServer, 580, ns.getPlayer(), 1);
  output += '\n\tgrowThreads():\t\t' + hf.growThreads(targetServer, ns.getPlayer(), targetServer.moneyMax, 1);
  ns.tprint(output);
  ns.print(output);
}

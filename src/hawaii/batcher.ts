import { NS } from '@ns';
import { ServersWithRam, ServersWithMoney } from './utils';

export async function main(ns: NS) {
  if (ns.args.length != 1) {
    ns.tprint("Usage: batcher.js [server name]")
    ns.exit()
  }
  let targetServerName = ns.args[0].toString()
  let targetServer = ns.getServer(targetServerName)
  
  // First, copy the latest version of all the batch scipts
  // to all the servers with useable RAM
  const scripts = [
    "/hawaii/batch_grow.js",
    "/hawaii/batch_hack.js",
    "/hawaii/batch_weaken.js"
  ]
  for (let server of ServersWithRam) {

    if (!ns.scp(scripts, server, "home")){
      ns.tprint("Could not copy HGW scripts to " + server + "! Abandoning batcher.")
      ns.exit()
    }
  }
}

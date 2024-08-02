import { NS } from '@ns';
import { ServersWithRam} from './utils';

const stepDelay = 20

async function runOnServers(
  ns: NS,
  scriptPath: string,
  targetServer: string,
  batchId: number,
  msDelay: number,
  threads: number
){
  let ramUsage = ns.getScriptRam(scriptPath)
  let allServersWithRam = ns.getPurchasedServers().concat(ServersWithRam)
  let scriptsLeftToAllocate = threads
  while (scriptsLeftToAllocate > 0) {
    for (let serverName of allServersWithRam) {
      let server = ns.getServer(serverName)
      if ((server.maxRam - server.ramUsed) > ramUsage) {
        ns.exec(scriptPath, serverName, 1, targetServer, msDelay, batchId)
        scriptsLeftToAllocate -= 1
        break
      }
    }
    await ns.sleep(stepDelay)
  }
}

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
  let allServersWithRam = ns.getPurchasedServers().concat(ServersWithRam)
  for (let server of allServersWithRam) {
    if (!ns.scp(scripts, server, "home")){
      ns.print("Could not copy HGW scripts to " + server + "! Abandoning batcher.")
      ns.exit()
    }
  }

  let hackTime = -1
  let growTime = -1
  let weakenTime = -1
  let batchCount = 0

  // Minimize Server Security
  while(true) {
    if (
      ns.getServerSecurityLevel(targetServerName) == ns.getServerMinSecurityLevel(targetServerName)
    ) {
      break
    }
    await runOnServers(ns, "/hawaii/batch_weaken.js", targetServerName, batchCount, 0, 1)
    await ns.sleep(stepDelay)
    batchCount += 1
  }

  // Kill unneeded spawned prep scripts
  for (let server of allServersWithRam) {
    ns.killall(server)
  }

  // Prep The Server
  batchCount = 0
  while(true) {
    if (
      ns.getServerSecurityLevel(targetServerName) == ns.getServerMinSecurityLevel(targetServerName) &&
      ns.getServerMaxMoney(targetServerName) == ns.getServerMoneyAvailable(targetServerName)
    ) {
      break
    }
    growTime = ns.getGrowTime(targetServerName)
    weakenTime = ns.getWeakenTime(targetServerName)
    await runOnServers(ns, "/hawaii/batch_weaken.js", targetServerName, batchCount, 0, 1)
    await runOnServers(ns, "/hawaii/batch_grow.js", targetServerName, batchCount, (weakenTime - growTime) + (stepDelay), 12)
    await ns.sleep(stepDelay * 2)
    batchCount += 1
  }

  // Kill unneeded spawned prep scripts
  for (let server of allServersWithRam) {
    ns.killall(server)
  }

  // Deploy the HWGW!
  batchCount = 0
  while(true) {
    if (ns.getServerMinSecurityLevel(targetServerName) < ns.getServerSecurityLevel(targetServerName)) {
      ns.print("WARN: Started new batch run but security is not minimized. This should not happen.")
    }
    if (ns.getServerMoneyAvailable(targetServerName) < ns.getServerMaxMoney(targetServerName)) {
      ns.print("WARN: Started new batch run but money is not maximized. This should not happen.")
    }
    hackTime = ns.getHackTime(targetServerName)
    growTime = ns.getGrowTime(targetServerName)
    weakenTime = ns.getWeakenTime(targetServerName)
    await runOnServers(ns, "/hawaii/batch_weaken.js", targetServerName, batchCount, 0, 1)
    await runOnServers(ns, "/hawaii/batch_weaken.js", targetServerName, batchCount, stepDelay, 1)
    await runOnServers(ns, "/hawaii/batch_grow.js", targetServerName, batchCount, (weakenTime - growTime) + (stepDelay * 2), 2)
    await runOnServers(ns, "/hawaii/batch_hack.js", targetServerName, batchCount, (weakenTime - hackTime) + (stepDelay * 3), 1)
    await ns.sleep(stepDelay * 4)
    batchCount += 1
  }
}

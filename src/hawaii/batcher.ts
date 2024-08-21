import { NS } from '@ns';
import { ServersWithRam } from './utils';

const stepDelay = 20;
const reserveHomeRam = 20;

async function runOnServers(
  ns: NS,
  scriptPath: string,
  targetServer: string,
  batchId: number,
  msDelay: number,
  threads: number,
) {
  const ramUsage = ns.getScriptRam(scriptPath);
  const allServersWithRam = ns.getPurchasedServers();
  allServersWithRam.push('home');
  allServersWithRam.concat(ServersWithRam);
  let scriptsLeftToAllocate = threads;
  while (scriptsLeftToAllocate > 0) {
    for (const serverName of allServersWithRam) {
      const server = ns.getServer(serverName);
      if (serverName === 'home' && server.maxRam - server.ramUsed < Math.max(ramUsage, reserveHomeRam) && server) {
        continue;
      }
      if (server.maxRam - server.ramUsed > ramUsage) {
        ns.exec(scriptPath, serverName, 1, targetServer, msDelay, batchId, ns.pid);
        scriptsLeftToAllocate -= 1;
        break;
      }
    }
    await ns.sleep(stepDelay);
  }
}

export async function main(ns: NS) {
  if (ns.args.length != 1) {
    ns.tprint('Usage: batcher.js [server name]');
    ns.exit();
  }
  ns.disableLog('ALL');
  const targetServerName = ns.args[0].toString();

  // First, copy the latest version of all the batch scipts
  // to all the servers with useable RAM
  const scripts = ['/hawaii/batch_grow.js', '/hawaii/batch_hack.js', '/hawaii/batch_weaken.js'];
  const allServersWithRam = ns.getPurchasedServers().concat(ServersWithRam);
  for (const server of allServersWithRam) {
    if (!ns.scp(scripts, server, 'home')) {
      ns.print('Could not copy HGW scripts to ' + server + '! Abandoning batcher.');
      ns.exit();
    }
  }

  let hackTime = -1;
  let growTime = -1;
  let weakenTime = -1;
  let batchCount = 0;

  // Minimize Server Security
  ns.print('Starting minimizing of security.');
  while (true) {
    if (ns.getServerSecurityLevel(targetServerName) == ns.getServerMinSecurityLevel(targetServerName)) {
      break;
    }
    await runOnServers(ns, '/hawaii/batch_weaken.js', targetServerName, batchCount, 0, 1);
    await ns.sleep(stepDelay);
    batchCount += 1;
  }
  ns.grow;

  function killThisBatchWorkers() {
    for (const server of allServersWithRam) {
      for (const script of ns.ps(server)) {
        if (script.args[3] == ns.pid) {
          ns.kill(script.pid);
        }
      }
    }
  }
  ns.atExit(killThisBatchWorkers);

  // Kill unneeded spawned prep scripts
  killThisBatchWorkers();

  // Prep The Server
  ns.print('Starting growing of funds.');
  batchCount = 0;
  while (true) {
    if (
      ns.getServerSecurityLevel(targetServerName) == ns.getServerMinSecurityLevel(targetServerName) &&
      ns.getServerMaxMoney(targetServerName) == ns.getServerMoneyAvailable(targetServerName)
    ) {
      break;
    }
    growTime = ns.getGrowTime(targetServerName);
    weakenTime = ns.getWeakenTime(targetServerName);
    await runOnServers(ns, '/hawaii/batch_weaken.js', targetServerName, batchCount, 0, 1);
    await runOnServers(
      ns,
      '/hawaii/batch_grow.js',
      targetServerName,
      batchCount,
      weakenTime - growTime + stepDelay,
      12,
    );
    await ns.sleep(stepDelay * 2);
    batchCount += 1;
  }

  // Kill unneeded spawned prep scripts
  killThisBatchWorkers();

  // Deploy the HWGW!
  batchCount = 0;
  ns.print('Starting money printing hack loop.');
  while (true) {
    // if (ns.getServerMinSecurityLevel(targetServerName) < ns.getServerSecurityLevel(targetServerName)) {
    //   ns.print("WARN: Started new batch run but security is not minimized. This should not happen.")
    // }
    // if (ns.getServerMoneyAvailable(targetServerName) < ns.getServerMaxMoney(targetServerName)) {
    //   ns.print("WARN: Started new batch run but money is not maximized. This should not happen.")
    // }
    hackTime = ns.getHackTime(targetServerName);
    growTime = ns.getGrowTime(targetServerName);
    weakenTime = ns.getWeakenTime(targetServerName);
    await runOnServers(ns, '/hawaii/batch_weaken.js', targetServerName, batchCount, 0, 1);
    await runOnServers(ns, '/hawaii/batch_weaken.js', targetServerName, batchCount, stepDelay, 1);
    await runOnServers(
      ns,
      '/hawaii/batch_grow.js',
      targetServerName,
      batchCount,
      weakenTime - growTime + stepDelay * 2,
      4,
    );
    await runOnServers(
      ns,
      '/hawaii/batch_hack.js',
      targetServerName,
      batchCount,
      weakenTime - hackTime + stepDelay * 3,
      1,
    );
    await ns.sleep(stepDelay * 4);
    batchCount += 1;
  }
}

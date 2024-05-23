/** @param {NS} ns */
export async function main(ns) {
  const hf = ns.formulas.hacking;
  let testPlayer = ns.formulas.mockPlayer();
  testPlayer.skills.hacking = 200;

  let targetServer;
  if (ns.args.length == 0) {
    targetServer = ns.formulas.mockServer();
    targetServer.hostname = 'Mock-Test-Server';
    targetServer.moneyMax = 48_000_000.0;
    targetServer.moneyAvailable = targetServer.moneyMax;
    targetServer.cpuCores = 1;
    targetServer.maxRam = 32;
    targetServer.minDifficulty = 7;
    targetServer.baseDifficulty = targetServer.minDifficulty;
    targetServer.hackDifficulty = targetServer.minDifficulty;
    targetServer.organizationName = 'grgcorp';
    targetServer.purchasedByPlayer = false;
    targetServer.ip = '127.0.0.1';
    targetServer.ramUsed = 0;
    targetServer.requiredHackingSkill = 100;
    targetServer.serverGrowth = 35;
  } else {
    targetServer = ns.getServer(ns.args[0]);
  }

  const maxMoney = targetServer.moneyMax;
  const currentMoney = targetServer.moneyAvailable;
  const threadsToMaxMoney = hf.growThreads(targetServer, testPlayer, maxMoney, 1);
  const serverGrowTime = hf.growTime(targetServer, testPlayer);
  const singleThreadHackPercent = hf.hackPercent(targetServer, testPlayer);
  const serverHackTime = hf.hackTime(targetServer, testPlayer);
  const serverWeakenTime = hf.weakenTime(targetServer, testPlayer);
  const weakenToHackTimeRatio = serverWeakenTime / serverHackTime;
  const weakenToGrowTimeRatio = serverWeakenTime / serverGrowTime;
  const growToHackTimeRatio = serverGrowTime / serverHackTime;
  const singleThreadHackAmount = maxMoney * singleThreadHackPercent;
  const moneyAfterOneHack = maxMoney - singleThreadHackAmount;
  if (targetServer === 'Mock-Test-Server') {
    targetServer.moneyAvailable = moneyAfterOneHack;
  }
  const singleThreadGrowPercent =
    hf.growPercent(targetServer, 1, testPlayer, 1) - targetServer.moneyAvailable / targetServer.moneyMax;
  const singleThreadGrowAmount = targetServer.moneyAvailable * singleThreadGrowPercent;

  ns.tprint('****************************************************************');
  ns.tprint(` >>> Hack Test Stats: ${targetServer.hostname} <<<`);
  ns.tprint('****************************************************************');
  ns.tprint('');
  ns.tprint(' > Time Stats < ');
  ns.tprint('');
  ns.tprint(`Weaken Time: ${serverWeakenTime / 1000} seconds`);
  ns.tprint(`Grow Time: ${serverGrowTime / 1000} seconds`);
  ns.tprint(`Hack Time: ${serverHackTime / 1000} seconds`);
  ns.tprint(`Weaken/Hack Time Ratio: ${weakenToHackTimeRatio}`);
  ns.tprint(`Weaken/Grow Time Ratio: ${weakenToGrowTimeRatio}`);
  ns.tprint(`Grow/Hack Time Ratio: ${growToHackTimeRatio}`);
  ns.tprint('');
  ns.tprint(' > Money Stats < ');
  ns.tprint('');
  ns.tprint(`Max Money: ${maxMoney}`);
  ns.tprint(`Current Money: ${currentMoney}`);
  ns.tprint(`Single Thread Hack Percent: ${singleThreadHackPercent * 100.0}%`);
  ns.tprint(`Single Thread Hack Amount: ${singleThreadHackAmount}`);
  ns.tprint(`Single Thread Growth Percent: ${singleThreadGrowPercent * 100.0}%`);
  ns.tprint(`Single Thread Growth Amount: ${singleThreadGrowAmount}`);
  ns.tprint(`Grow Threads To Max Money: ${threadsToMaxMoney}`);
  ns.tprint(`Hack/Grow Amount Ratio: ${singleThreadHackAmount / singleThreadGrowAmount}`);
  ns.tprint(`Hack/Grow Percent Ratio: ${singleThreadHackPercent / singleThreadGrowPercent}`);
}

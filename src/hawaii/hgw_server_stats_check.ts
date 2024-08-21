import { NS } from '@ns';
import { HackingFormulas } from '@ns';

export async function main(ns: NS) {
  let hf = ns.formulas.hacking
  let targetServerName = "omega-net"
  let targetServer = ns.getServer(targetServerName)
  let myself = ns.getPlayer()
  ns.tprint("Analyzing HGW stats for " + targetServerName)
  ns.tprint("\n******* Money Stats *******\n")
  let currentMoney = (targetServer.moneyAvailable || 0)
  ns.tprint("Current Money: $" + ns.formatNumber( currentMoney, 2))
  let maxMoney = (targetServer.moneyMax || 0)
  ns.tprint("Max Money: $" + ns.formatNumber(maxMoney, 2))
  ns.tprint("\n******* Grow Stats *******\n")
  let growAmount = hf.growAmount(targetServer, myself, 1, 1)
  ns.tprint("Grow Amount: " + growAmount)
  let growPercent = hf.growPercent(targetServer, 1, myself, 1)
  ns.tprint("Grow Percent: " + growPercent)
  let growThreads= hf.growThreads(targetServer, myself, (targetServer.moneyMax || 0), 1)
  ns.tprint("Grow Threads: " + growThreads)
  let growTime = hf.growTime(targetServer, myself)
  ns.tprint("Grow Time: " + growTime)
  let growSecurityIncrease = ns.growthAnalyzeSecurity(1, targetServerName)
  ns.tprint("Grow Security Increase: " + growSecurityIncrease)
  ns.tprint("\n******* Hack Stats *******\n")
  let hackChance = hf.hackChance(targetServer, myself)
  ns.tprint("Hack Chance: " + hackChance)
  let hackExp = hf.hackExp(targetServer, myself)
  ns.tprint("Hack Exp: " + hackExp)
  let hackPercent = hf.hackPercent(targetServer, myself)
  ns.tprint("Hack Percent: " + hackPercent)
  let hackTime = hf.hackTime(targetServer, myself)
  ns.tprint("Hack Time: " + hackTime)
  ns.tprint("\n******* Weaken Stats *******\n")
  let weakenTime = hf.weakenTime(targetServer, myself)
  ns.tprint("Weaken Time: " + weakenTime)
  ns.tprint("\n******* Time Stats *******\n")
  ns.tprint("Grow Time: " + growTime)
  ns.tprint("Hack Time: " + hackTime)
  ns.tprint("Weaken Time: " + weakenTime)
  ns.tprint("Weaken-Grow Ratio: " + (weakenTime / growTime))
  ns.tprint("Grow-Weaken Ratio: " + (growTime / weakenTime))
  ns.tprint("Grow-Hack Ratio: " + (growTime / hackTime))
  ns.tprint("Hack-Grow Ratio: " + (hackTime / growTime))
  ns.tprint("Weaken-Hack Ratio: " + (weakenTime / hackTime))
  ns.tprint("Hack-Weaken Ratio: " + (hackTime / weakenTime))
}

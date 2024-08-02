import { NS } from '@ns';

export async function main(ns: NS) {
  if (ns.args.length != 2) {
    ns.tprint("Usage: batch_hack.js [server_name] [batch_number]")
    ns.exit()
  }
  await ns.weaken(ns.args[0].toString())
  ns.tprint("Finished weaken against " + ns.args[0].toString() + " in batch number" + ns.args[1].toString())
}

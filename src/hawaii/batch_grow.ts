import { NS } from '@ns';

export async function main(ns: NS) {
  if (ns.args.length != 3) {
    ns.tprint("Usage: batch_grow.js [server_name] [ms_delay] [batch_number]")
    ns.exit()
  }
  await ns.sleep(+ns.args[1].valueOf())
  await ns.grow(ns.args[0].toString())
  ns.print("Finished grow against " + ns.args[0].toString() + " in batch number" + ns.args[2].toString())
}

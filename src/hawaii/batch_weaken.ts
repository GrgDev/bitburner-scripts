import { NS } from '@ns';

export async function main(ns: NS) {
  if (ns.args.length < 3) {
    ns.tprint(`Unexpected arguments: ${ns.args}`)
    ns.tprint("Usage: batch_weaken.js [server_name] [ms_delay] [batch_number]")
    ns.exit()
  }
  await ns.sleep(+ns.args[1].valueOf())
  await ns.weaken(ns.args[0].toString())
  //ns.print("Finished weaken against " + ns.args[0].toString() + " in batch number" + ns.args[2].toString())
}

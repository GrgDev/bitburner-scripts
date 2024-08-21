import { NS } from '@ns';

function visitServer(ns: NS, name: string, visited: Array<string>) {
  //ns.tprint("Visiting " + name)
  visited.push(name)
  //ns.tprint("Visit list so far: " + visited)
  let unvisitedChildren = ns.scan(name).filter(child =>!visited.includes(child))
  for (let child of unvisitedChildren) {
    visitServer(ns, child, visited)
  }
}

export async function main(ns: NS) {
  let currentServer = ns.getServer("home")
  let serverList: string[] = []
  visitServer(ns, "home", serverList)
  let hackableServerList = serverList.filter(server => (ns.getServer(server).maxRam || 0) > 0 && ns.getServer(server).purchasedByPlayer == false)
  let output = ""
  for (let server of hackableServerList) {
    output += "\n\"" + server + "\","
  }
  ns.tprint(output)
}

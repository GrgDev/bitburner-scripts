/** @param {NS} ns **/
export async function main(ns) {
	// Config to avoid RAM cost on server calls
	const target = "foodnstuff";
	const moneyThreshold = 37500000;
	const securityTreshold = 8;

	while(true) {
		if (ns.getServerSecurityLevel(target) > securityTreshold) {
			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < moneyThreshold) {
			await ns.grow(target);
		} else {
			await ns.hack(target);
		}
	}
}
// This hashmap is mostly for documentation purposes
// so I don't have to look up the upgrade details in
// a second window all the time.
const hashCosts = {
	// Sell hashes for $1m
	"Sell for Money": {
		"cost": 4.000,
		"resets?": true,
		"param?": false,
	},

	// Sell hashes for $1b in Corporation funds
	"Sell for Corporation Funds": {
		"cost": 100.000,
		"resets?": false,
		"param?": false,
	},

	// Use hashes to decrease the minimum security of a single server by 2%.
	// Note that a server's minimum security cannot go below 1.
	// This effect persists until you install Augmentations (since servers are reset at that time).
	"Reduce Minimum Security": {
		"cost": 50.000,
		"resets?": true,
		"param?": true, // name of server
	},

	// Use hashes to increase the maximum amount of money on a single server by 2%.
	// Note that a server's maximum money is soft capped above $10t.
	// This effect persists until you install Augmentations (since servers are reset at that time).
	"Increase Maximum Money": {
		"cost": 100.000,
		"resets?": true,
		"param?": true, // name of server
	},

	// Use hashes to improve the experience earned when studying at a university by 20%.
	// This effect persists until you install Augmentations.
	"Improve Studying": {
		"cost": 50.000,
		"resets?": true,
		"param?": false,
	},

	// Use hashes to improve the experience earned when training at the gym by 20%.
	// This effect persists until you install Augmentations.
	"Improve Gym Training": {
		"cost": 50.000,
		"resets?": true,
		"param?": false,
	},

	// Exchange hashes for 1k Scientific Research in all of your Corporation's Industries.
	"Exchange for Corporation Research": {
		"cost": 200.000,
		"resets?": false,
		"param?": false,
	},

	// Exchange hashes for 100 Bladeburner Rank.
	"Exchange for Bladeburner Rank": {
		"cost": 250.000,
		"resets?": false,
		"param?": false,
	},

	// Exchanges hashes for 10 Bladeburner Skill Points.
	"Exchange for Bladeburner SP": {
		"cost": 250.000,
		"resets?": false,
		"param?": false,
	},

	// Generate a random Coding Contract somewhere on the network.
	"Generate Coding Contract": {
		"cost": 200.000,
		"resets?": true,
		"param?": false,
	},

	// Use hashes to increase the favor with a company by 5. This effect is permanent.
	"Company Favor": {
		"cost": 200.000,
		"resets?": false,
		"param?": true, // name of company
	},
};

/** @param {NS} ns */
function applyUpgrade (ns, upgradeName, param) {
	window.onerror = function(error, url, line) {
		ns.print(`${error}:${url}:${line}`);
	}
	const hn = ns.hacknet;
	let hashCount = hn.numHashes();
	let upgradeCost = hn.hashCost(upgradeName);
	let success;
	while (hashCount > upgradeCost) {
		if (!param) {
			success = hn.spendHashes(upgradeName);
		} else {
			success = hn.spendHashes(upgradeName, param);
		}
		if (!success) {
			ns.print(`There was an error trying to apply upgrade type '${upgradeName}' with parameter '${upgradeCost}'`);
		} else {
			ns.print('Upgrade successfully applied.');
		}
		hashCount = hn.numHashes();
		upgradeCost = hn.hashCost(upgradeName);
	}
}

/** @param {NS} ns */
export async function main(ns) {
	// This is just to kill the old process of this script if already running.
	const homePS = ns.ps("home");
	ns.print(` Looking for old hashnet process to kill in list of ${homePS.length} processe(s).`);
	ns.print(`Current proccess info: ${ns.getScriptName()}:${ns.pid}`);
	for(let script of homePS) {
		if (script.filename === ns.getScriptName() && script.pid != ns.pid) {
			ns.print(`Found old process to kill. ${script.filename}:${script.pid}`);
			const killSuccess = ns.kill(script.pid);
			ns.print(`Was kill successful? ${killSuccess}`);
			break;
		} else {
			ns.print(`Process did not match. ${script.filename}:{${script.pid}}`);
		}
	}

	// TODO: Look to see if there is a better means of doing this rather than a polling loop.
	ns.disableLog('sleep');
	while (true) {
		//applyUpgrade(ns, "Sell for Money");
		applyUpgrade(ns, "Increase Maximum Money", "alpha-ent");
		//applyUpgrade(ns, "Improve Studying");
		await ns.sleep(5000);
	}
}
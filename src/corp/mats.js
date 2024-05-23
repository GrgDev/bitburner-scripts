/** @param {NS} ns */
export async function main(ns) {
  const chemHardwarewFactor = ns.corporation.getIndustryData('Chemical').hardwareFactor;
  const chemAICoreFactor = ns.corporation.getIndustryData('Chemical').aiCoreFactor;
  const chemRobotFactor = ns.corporation.getIndustryData('Chemical').robotFactor;
  const chemRealEstateFactor = ns.corporation.getIndustryData('Chemical').realEstateFactor;
  const hardwareData = ns.corporation.getMaterialData('Hardware').size;
  const aiCoreData = ns.corporation.getMaterialData('AI Cores').size;
  const robotData = ns.corporation.getMaterialData('Robots').size;
  const realEstateData = ns.corporation.getMaterialData('Real Estate').size;
  const factors = [chemHardwarewFactor, chemAICoreFactor, chemRobotFactor, chemRealEstateFactor];
  const weights = [hardwareData, aiCoreData, robotData, realEstateData];
  ns.tprint(JSON.stringify(chemHardwarewFactor));
  ns.tprint(JSON.stringify(chemAICoreFactor));
  ns.tprint(JSON.stringify(chemRobotFactor));
  ns.tprint(JSON.stringify(chemRealEstateFactor));
  ns.tprint(JSON.stringify(hardwareData));
  ns.tprint(JSON.stringify(aiCoreData));
  ns.tprint(JSON.stringify(robotData));
  ns.tprint(JSON.stringify(realEstateData));
  const matsAmounts = optimizeCorpoMaterials_raw(weights, factors, 750);
  ns.tprint(JSON.stringify(matsAmounts));
  ns.tprint(`Hardware Amount: ${matsAmounts[0] / 10}`);
  ns.tprint(`AI Core Amount: ${matsAmounts[1] / 10}`);
  ns.tprint(`Robot Amount: ${matsAmounts[2] / 10}`);
  ns.tprint(`Real Estate Amount: ${matsAmounts[3] / 10}`);
}

function optimizeCorpoMaterials_raw(weights, factors, spaceConstraint, round = true) {
  let p = factors.reduce((a, b) => a + b, 0);
  let w = weights.reduce((a, b) => a + b, 0);
  let r = [];

  for (let i = 0; i < weights.length; ++i) {
    let m =
      (spaceConstraint - 500 * ((weights[i] / factors[i]) * (p - factors[i]) - (w - weights[i]))) /
      (p / factors[i]) /
      weights[i];
    if (factors[i] <= 0 || m < 0) {
      let rw = weights.slice();
      let rf = factors.slice();
      rw.splice(i, 1);
      rf.splice(i, 1);
      let rr = optimizeCorpoMaterials_raw(rw, rf, spaceConstraint, round);
      rr.splice(i, 0, 0);
      return rr;
    } else {
      if (round) m = Math.round(m);
      r.push(m);
    }
  }
  return r;
}

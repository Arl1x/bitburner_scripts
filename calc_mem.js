/** @param {NS} ns */
export async function main(ns) {
  // Check for args to print help.
  const args = ns.flags([["help", false]]);
  const script = args._[0];
  const target = args._[1];
  if (!target || args.help) {
    ns.tprint("This script returns the number of threads that a script can use to run on a target server.");
    ns.tprint(`Usage: run ${ns.getScriptName()} SCRIPT SERVER`);
    ns.tprint("Example:");
    ns.tprint(`> run ${ns.getScriptName()} hack.js n00dles`);
    return;
  }
  
  const s_mem = ns.getScriptRam(script);
  const t_mem = ns.getServerMaxRam(target) - ns.getServerUsedRam(target);
  const num_of_threads = Math.floor(t_mem / s_mem);
  ns.print(`Returning ${num_of_threads}.`);
  ns.clearPort(1);
  ns.writePort(1,num_of_threads);
  return;
}

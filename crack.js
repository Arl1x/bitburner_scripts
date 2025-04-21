/** @param {NS} ns */
export async function main(ns) {
  // Check for args to print help.
  const args = ns.flags([["help", false]]);
  let target = args._[0];
  if (!target || args.help) {
      ns.tprint("This script helps you crack a server on the network based on what programs you have.");
      ns.tprint(`Usage: run ${ns.getScriptName()} SERVER`);
      ns.tprint("Example:");
      ns.tprint(`> run ${ns.getScriptName()} n00dles`);
      return;
  }

  // Check for each program to open ports on another server.
  var programs = [0,0,0,0,0];
  if (ns.fileExists("SQLInject.exe", "home")) {
    ns.sqlinject(target);
    programs[4] = 1;
  }
  if (ns.fileExists("HTTPWorm.exe", "home")) {
    ns.httpworm(target);
    programs[3] = 1;
  }
  if (ns.fileExists("relaySMTP.exe", "home")) {
    ns.relaysmtp(target);
    programs[2] = 1;
  }
  if (ns.fileExists("FTPCrack.exe", "home")) {
    ns.ftpcrack(target);
    programs[1] = 1;
  }
  if (ns.fileExists("BruteSSH.exe", "home")) {
    ns.brutessh(target);
    programs[0] = 1;
  }
  ns.nuke(target);
  return;
}

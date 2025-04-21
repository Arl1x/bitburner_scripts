/** @param {NS} ns */
export async function main(ns) {
  ns.enableLog("ALL");
  ns.clearLog();
  ns.print(`Custom Startup script is starting.`);
  ns.print(`Logging started.`);
  const script = "bitburner_scripts/custom-hack-template.js";
  const crack = "bitburner_scripts/crack.js";
  const calc_mem = "bitburner_scripts/calc_mem.js";
  const progs = ["BruteSSH.exe",
                 "FTPCrack.exe",
                 "relaySMTP.exe",
                 "HTTPWorm.exe",
                 "SQLInject.exe"];
  const servers0Port = ["n00dles",
                        "sigma-cosmetics",
                        "joesguns",
                        "nectar-net",
                        "hong-fang-tea",
                        "harakiri-sushi",
                        "foodnstuff"];

  // Array of all servers that only need 1 port opened
  // to gain root access. These have 32 GB of RAM
  const servers1Port = ["neo-net",
                        "zer0",
                        "max-hardware",
                        "iron-gym",
                        "CSEC"];

  const servers2Port = ["crush-fitness",
                        "phantasy",
                        "silver-helix",
                        "omega-net",
                        "the-hub",
                        "johnson-ortho",
                        "avmnite-02h"];
  const servers3Port = ["summit-uni",
                        "netlink",
                        "rothman-uni",
                        "catalyst",
                        "millenium-fitness",
                        "computek",
                        "I.I.I.I",
                        "rho-construction"];
  const servers4Port = ["lexo-corp",
                        "applied-energetics",
                        "zb-def",
                        ".",
                        "unitalife",
                        "aevum-police",
                        "global-pharm",
                        "univ-energy",
                        "nova-med",
                        "run4theh111z",
                        "snap-fitness",
                        "syscore",
                        "alpha-ent"];
  const servers5Port = ["zb-institute",
                        "galactic-cyber",
                        "deltaone",
                        "defcomm",
                        "icarus",
                        "solaris",
                        "infocomm",
                        "fulcrumtech",
                        "4sigma",
                        "b-and-a",
                        "ecorp",
                        "megacorp",
                        "powerhouse-fitness",
                        "kuai-gong",
                        "nwo",
                        "fulcrumassets",
                        "The-Cave",
                        "titan-labs",
                        "helios",
                        "blade",
                        "clarkinc",
                        "omnia",
                        "taiyang-digital",
                        "zeus-med",
                        "microdyne",
                        "stormtech",
                        "omnitek",
                        "vitalife",
                        "aerocorp"];
  ns.print(`Constants initialized.`)

  ns.print(`Starting the pserv script.`)
  ns.exec("bitburner_scripts/purchase-server-8gb.js", `home`, 1)
  ns.print(`Pserv script started.`)

  for (let j = 0; j < progs.length+1; ++j) {
    let serv_list = "servers" + eval(j) + "Port";
    ns.print(`\nRunning against ${serv_list}.`)
    for (let i = 0; i < eval(serv_list).length; ++i) {
      let serv = eval(serv_list)[i];
      ns.print(`Working on ${serv}.`)
      if (ns.scriptRunning(script,serv)) {
        ns.scriptKill(script,serv);
        ns.print(`Killed ${script} on ${serv}`)
      }
      await ns.exec(calc_mem, `home`, 1, script, serv);
      let threads = ns.readPort(1);
      let p_hack = ns.getHackingLevel();
      let s_hack = ns.getServerRequiredHackingLevel(serv);
      ns.print(`Threads: ${threads}.`)
      if (threads > 0 && p_hack >= s_hack) {
        ns.scp(script, serv);
        ns.exec(crack, `home`, 1, serv);
        ns.print(`Cracked.`)
        ns.exec(script, serv, threads);
        ns.print(`Running ${script}.`);
      }
      else if (threads > 0 && p_hack < s_hack) {
        while (p_hack < s_hack) {
          ns.print(`Hacking level is not high enough for ${serv}.`);
          ns.print(`Current hacking level: ${p_hack}`);
          ns.print(`Server required hacking level: ${s_hack}`);
          await ns.sleep(60000);
          p_hack = ns.getHackingLevel();
        }
        ns.scp(script, serv);
        ns.exec(crack, `home`, 1, serv);
        ns.print(`Cracked.`)
        ns.exec(script, serv, threads);
        ns.print(`Running ${script}.`);
      }
      else {
        ns.print(`No RAM available to run.`)
      }
    }
    while (!ns.fileExists(progs[j])) {
      await ns.sleep(60000);
    }
  }
  ns.print(`Script has executed against all servers with all programs.`);
  ns.toast(`Startup script completed.`, 'SUCCESS', null);
}

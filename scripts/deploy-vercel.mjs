import { execFileSync } from "node:child_process";

const alias = process.argv[2] || "ang-small-apps.vercel.app";
const npx = process.platform === "win32" ? "npx.cmd" : "npx";

function run(args) {
  return execFileSync(npx, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

console.log("Deploying to Vercel production...");
const deployOutput = run(["vercel", "--prod", "--yes"]);
process.stdout.write(deployOutput);

const urlMatch =
  deployOutput.match(/"url"\s*:\s*"([^"]+)"/) ||
  deployOutput.match(/Production\s+(https?:\/\/\S+)/);

if (!urlMatch) {
  throw new Error("Could not find the deployment URL in Vercel output.");
}

const deploymentHost = urlMatch[1].replace(/^https?:\/\//, "").replace(/\/$/, "");

console.log(`Updating alias ${alias} -> ${deploymentHost}...`);
const aliasOutput = run(["vercel", "alias", "set", deploymentHost, alias]);
process.stdout.write(aliasOutput);
console.log(`Done: https://${alias}`);

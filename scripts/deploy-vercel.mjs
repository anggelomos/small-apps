import { execSync } from "node:child_process";

const alias = process.argv[2] || "ang-small-apps.vercel.app";

function assertSafeHost(value, label) {
  if (!/^[a-zA-Z0-9.-]+$/.test(value)) {
    throw new Error(`${label} contains unsupported characters: ${value}`);
  }
}

function run(command) {
  return execSync(command, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

assertSafeHost(alias, "Alias");

console.log("Deploying to Vercel production...");
const deployOutput = run("npx vercel --prod --yes");
process.stdout.write(deployOutput);

const urlMatch =
  deployOutput.match(/"url"\s*:\s*"([^"]+)"/) ||
  deployOutput.match(/Production\s+(https?:\/\/\S+)/);

if (!urlMatch) {
  throw new Error("Could not find the deployment URL in Vercel output.");
}

const deploymentHost = urlMatch[1].replace(/^https?:\/\//, "").replace(/\/$/, "");
assertSafeHost(deploymentHost, "Deployment host");

console.log(`Updating alias ${alias} -> ${deploymentHost}...`);
const aliasOutput = run(`npx vercel alias set ${deploymentHost} ${alias}`);
process.stdout.write(aliasOutput);
console.log(`Done: https://${alias}`);

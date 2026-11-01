import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const EXPECTED_SOURCE_COMMIT = "9a91b1926a5fbfaffd302a7a41a94d4d53a1154e";
const EXPECTED_SOURCE_TAG = "effect@4.1.0";
const EXPECTED_SOURCE_TREE = "0a7c256f351561fef785c03ab1e825ee6e78bd5a";

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function readVendoredTree() {
  return execFileSync("git", ["rev-parse", "HEAD:repos/effect"], {
    encoding: "utf8",
  }).trim();
}

function assertEqual(actual, expected, label) {
  if (actual === expected) {
    return;
  }

  throw new Error(`${label} must be ${expected}, received ${actual}.`);
}

const portfolioPackage = await readJson("apps/www/package.json");
const effectPackage = await readJson(
  "repos/effect/packages/effect/package.json"
);
const effectVitestPackage = await readJson(
  "repos/effect/packages/vitest/package.json"
);
const installedVersion = portfolioPackage.dependencies.effect;
const effectVitestVersion = portfolioPackage.devDependencies["@effect/vitest"];
const sourceTree = readVendoredTree();

assertEqual(installedVersion, effectPackage.version, "Effect source version");
assertEqual(
  effectVitestVersion,
  effectVitestPackage.version,
  "@effect/vitest source version"
);
assertEqual(
  EXPECTED_SOURCE_TAG,
  `effect@${installedVersion}`,
  "Effect source tag"
);
assertEqual(sourceTree, EXPECTED_SOURCE_TREE, "Effect source tree");

console.log(
  `Effect source matches ${EXPECTED_SOURCE_TAG} at ${EXPECTED_SOURCE_COMMIT}.`
);

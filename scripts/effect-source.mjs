import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const EXPECTED_SOURCE_COMMIT = "66114151c2b4640bf773f2b3456ce70d679422f6";
const EXPECTED_SOURCE_TAG = "effect@4.0.0-rc.110";
const EXPECTED_SOURCE_TREE = "e5cfbd6b0885c55d4e8f0f7605669960334bdcf5";

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

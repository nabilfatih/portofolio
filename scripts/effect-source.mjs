import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const EXPECTED_SOURCE_COMMIT = "66114151c2b4640bf773f2b3456ce70d679422f6";
const EXPECTED_SOURCE_TAG = "effect@4.0.0-rc.110";
const SUBTREE_COMMIT_PATTERN = /^git-subtree-split: ([0-9a-f]{40})$/m;

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function findSubtreeCommit() {
  const message = execFileSync(
    "git",
    [
      "log",
      "--format=%B",
      "--grep=^git-subtree-dir: repos/effect$",
      "-1",
      "HEAD",
    ],
    { encoding: "utf8" }
  );
  const match = message.match(SUBTREE_COMMIT_PATTERN);

  if (!match) {
    throw new Error("Could not find the Effect subtree source commit.");
  }

  return match[1];
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
const sourceCommit = findSubtreeCommit();

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
assertEqual(sourceCommit, EXPECTED_SOURCE_COMMIT, "Effect source commit");

console.log(
  `Effect source matches ${EXPECTED_SOURCE_TAG} at ${EXPECTED_SOURCE_COMMIT}.`
);

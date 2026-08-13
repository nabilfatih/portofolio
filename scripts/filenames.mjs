import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { basename, extname } from "node:path";

const MAX_WORDS = 2;
const CONVENTIONAL_SUFFIXES = [".config", ".spec", ".test"];

function repositoryFiles() {
  const output = execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard"],
    { encoding: "utf8" }
  );

  return output.split("\n").filter((file) => file && existsSync(file));
}

function filenameStem(file) {
  const name = basename(file);
  const extension = extname(name);
  let stem = extension ? name.slice(0, -extension.length) : name;

  for (const suffix of CONVENTIONAL_SUFFIXES) {
    if (stem.endsWith(suffix)) {
      stem = stem.slice(0, -suffix.length);
      break;
    }
  }

  return stem;
}

function wordCount(file) {
  return filenameStem(file).split("-").filter(Boolean).length;
}

const violations = repositoryFiles().filter(
  (file) => wordCount(file) > MAX_WORDS
);

if (violations.length > 0) {
  console.error("File names may contain at most two hyphen-separated words:\n");
  console.error(violations.map((file) => `- ${file}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("All file names follow the two-word convention.");
}

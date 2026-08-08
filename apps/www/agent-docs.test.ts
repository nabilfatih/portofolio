// @vitest-environment node

import { type CheckResult, getChecksSorted, runChecks } from "afdocs";
import { loadConfig } from "afdocs/helpers";
import { beforeAll, describe, expect, it } from "vitest";

const AGENT_DOCS_TIMEOUT_MS = 120_000;
const ALLOWED_SKIP_CHECKS = new Set(["auth-alternative-access"]);

describe("agent-friendly portfolio", () => {
  let resultsByCheck: Map<string, CheckResult>;

  beforeAll(async () => {
    const config = await loadConfig();
    const report = await runChecks(config.url, {
      checkIds: config.checks,
      curatedPages: config.pages,
      skipCheckIds: config.skipChecks,
      ...config.options,
    });

    resultsByCheck = new Map(
      report.results.map((result) => [result.id, result])
    );
  }, AGENT_DOCS_TIMEOUT_MS);

  for (const check of getChecksSorted()) {
    it(check.id, () => {
      const result = resultsByCheck.get(check.id);

      expect(result, `${check.id} did not run`).toBeDefined();
      if (!result || result.status === "pass") {
        return;
      }

      if (result.status === "skip" && ALLOWED_SKIP_CHECKS.has(result.id)) {
        return;
      }

      expect.fail(`[${result.status}] ${result.message}`);
    });
  }
});

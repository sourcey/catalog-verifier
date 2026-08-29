import assert from "node:assert/strict";
import { test } from "node:test";
import { CatalogVerifierApplication } from "@sourcey/catalog-verifier";

test("the public package exposes both exact contribution criteria sets", () => {
  const verifier = new CatalogVerifierApplication();
  assert.deepEqual(
    verifier.explain("startup-credits").map(({ rule_id }) => rule_id),
    [
      "startup-credits.changed-closure",
      "startup-credits.taxonomy",
      "startup-credits.identity-context",
    ],
  );
  assert.deepEqual(
    verifier.explain("agent-readiness").map(({ rule_id }) => rule_id),
    [
      "agent-readiness.changed-closure",
      "agent-readiness.policy-closure",
      "agent-readiness.identity-context",
    ],
  );
});

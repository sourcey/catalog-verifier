# Sourcey Catalog Verifier

`@sourcey/catalog-verifier` is Sourcey's deterministic contribution preflight for
the [Startup Credits](https://github.com/sourcey/startup-credits) and
[Agent Ready Services](https://github.com/sourcey/agent-ready-services) data
repositories.

It does not verify Catalog releases. Each release names, by digest, the exact
verifier archive that verifies it. That archive re-derives every Agent
Readiness card the release carries from its declarations and run records. To
verify a release, use the archive it names, published at
`https://artifacts.sourcey.com/catalog/code/catalog-verifier/sha256-<digest>/`.
Using that archive, rather than whichever version of this package is current,
means a release is always judged by the verifier that admitted it. Since 1.2.0
this package no longer has a `verify-release` command or
`CatalogVerifierApplication.verifyRelease`.

The verifier checks exact local candidate bytes. It does not crawl vendors,
judge factual truth, prove submitter authority, run an Agent Readiness
assessment, submit data, or make a payment.

## Contribution preflight

Validation is deliberately two-step. First derive the bounded identity query
from the exact Git objects, then ask Sourcey's public API to sign its current
Catalog answer. The final validation remains offline over those saved bytes.

```bash
sourcey-catalog-verify identity-context-request startup-credits \
  --repository . \
  --base origin/main \
  --head HEAD \
  --taxonomy ./taxonomy.json \
  --live-parent-release-id sha256:... > identity-query.json

curl --fail-with-body --silent --show-error \
  -H 'content-type: application/json' \
  --data-binary @identity-query.json \
  https://api.sourcey.com/v1/catalog-verifier/identity-contexts \
  | jq '.data' > identity-context.json

sourcey-catalog-verify validate startup-credits \
  --repository . \
  --base origin/main \
  --head HEAD \
  --taxonomy ./taxonomy.json \
  --identity-context identity-context.json \
  --root-set sourcey-root-set.json \
  --trusted-root-digest sha256:... \
  --verified-at "$(node -p 'new Date().toISOString()')"
```

Use `agent-readiness` instead of `startup-credits` for an Agent Ready Services
declaration. Run `sourcey-catalog-verify explain <repository-kind>` for the
exact executable criteria and exclusions.

A green result means only that the supplied bytes satisfy the deterministic
contribution and identity-context contracts. Sourcey's admission and release
authority remains separate.

## Your relationship to the company

For a Startup Credits file, set `authority_intent: entity` at the top level when you represent
the company, or `authority_intent: community` for an independent contribution. A file without
this field remains a community contribution. Agent Ready Services uses the same choices on each
declaration's `authority_intent`.

A company representative confirms domain control and approves the exact submitted details on
Sourcey's continuation for the pull request. An existing company claim does not approve future
changes. Independent contributions are checked against public sources and publish as observed
records, not vendor statements. Contributor DCO sign-off is required in either case.

If an otherwise eligible company does not meet automatic listing criteria, the same submission
offers Human verification. Payment does not supply a vendor signature or fix unsupported facts.

## Supply chain

This repository is a generated public release-source projection from Sourcey's
single Catalog verifier owner. Contract and rule changes must be made in that
owner and reprojected; pull requests that hand-edit generated implementation
files are not accepted.

Published packages contain no install scripts, telemetry, network daemon,
browser, mutable plugin loader, or Catalog data. Releases are exact-versioned
and carry npm provenance.

## License

MIT. See `LICENSE` and `THIRD_PARTY_NOTICES.json`.

# Sourcey Catalog Verifier

`@sourcey/catalog-verifier` is Sourcey's deterministic contribution preflight for
the [Startup Credits](https://github.com/sourcey/startup-credits) and
[Agent Ready Services](https://github.com/sourcey/agent-ready-services) data
repositories. It also verifies immutable Sourcey Catalog release bundles.

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
  --verified-at "$(date -u +%Y-%m-%dT%H:%M:%S.000Z)"
```

Use `agent-readiness` instead of `startup-credits` for an Agent Ready Services
declaration. Run `sourcey-catalog-verify explain <repository-kind>` for the
exact executable criteria and exclusions.

A green result means only that the supplied bytes satisfy the deterministic
contribution and identity-context contracts. Sourcey's admission and release
authority remains separate.

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

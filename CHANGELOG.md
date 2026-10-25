# Changelog

Release notes are maintained per immutable package version in GitHub Releases.

## 1.2.4

1.2.3 was tagged but never reached npm; 1.2.4 carries its changes.

- Releases publish to npm through npm's trusted publishing, with provenance.
- Job bindings declare OAuth client credentials and refresh-token delegations, each
  naming its token endpoint, and credentials placed as a query parameter. The `oauth`
  delegation, which obtained consent inside a run, is removed.

## 1.2.0

- Breaking: release verification leaves this package. `verify-release` and
  `CatalogVerifierApplication.verifyRelease` are removed. A release is verified with the
  exact verifier archive it names by digest.
- The package carries only the contribution checks: `validate`, `pull-request`,
  `identity-context-request` and `explain`.
- The data repositories' validation retries the identity context when Sourcey's live
  release advances during a check, instead of failing on the transient 409.

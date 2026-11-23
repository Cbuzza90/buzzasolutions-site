# Private Test

The Electricity Module 2 list exposes only a locked link. The test's bank and
condensed notes are encrypted in `public/private/electricity-test.enc.json`.
They are not imported into the client bundle, public notes registry, dashboard
or public question references. The password and decrypted source are not in Git.

Unlocking derives a non-extractable AES-256-GCM key using PBKDF2-SHA-256 with a
random salt and 310,000 iterations. Each encrypted payload or saved progress
snapshot uses a fresh 96-bit IV. Authentication failure rejects wrong passwords
or tampered data. The key is kept only in the unlocked page's memory.

The shared choice engine receives an isolated notes override and encrypted
storage adapter. The private notes' question references are built from the
decrypted bank only after unlocking. The public notes registry is never mutated.
Progress and best score use a single encrypted browser-storage envelope; opening
the route again requires the password. Lock flushes pending saves and unmounts
the attempt. Reset preserves the private best score.

For updates, prepare the corrected source and password file locally outside
version control, then run `scripts/encrypt-private-test.mjs` with the input JSON,
encrypted output path and password-file path. Stage only the encrypted asset.
Do not stage the input, password, attachments or temporary audit files.

The supplied photographs have no marked answer key. The preserved paper choices
are keyed using the existing course presentations, with source wording issues
explained inside the encrypted test. No private transcription belongs in public
documentation or automated test fixtures.

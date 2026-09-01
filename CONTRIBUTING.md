# Contributing

GameBlocks is released under the MIT License. There is no CLA. By opening a pull request you agree to license your contribution under MIT.

## Scope

This repository is source material for coding agents: small, inspectable 3D gameplay modules. Prefer adapting an existing module over adding a new abstraction. Keep a change local to the files that need it.

## Pull requests

1. Fork the repository and branch from `main`.
2. Match the surrounding module style (plain ES modules, no bundler).
3. If you change behavior, add a `*.test.js` next to the module and run:

```bash
node --experimental-default-type=module --test path/to/Module.test.js
```

4. Open a pull request against `xt4d/GameBlocks` `main`.

Issues are currently disabled on the upstream repository, so small, self-contained PRs are the expected contribution path.

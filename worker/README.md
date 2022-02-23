<div align="center">
  <img src="../docs/public/assets/icons/256.png" alt="substats-icon" width="100" />
  <p><strong><em>Worker - substats</em></strong></p>
</div>

## Details

- Uses Miniflare for a local Cloudflare Worker environment.
- Bindings (i.e., [variables and secrets](https://miniflare.dev/core/variables-secrets)) are defined in `.env`.
- A list of currently used secrets are defined in [`bindings.d.ts`](bindings.d.ts).

## Development

```bash
# Install dependencies for both packages
pnpm install
```

To run the worker locally with hot reload (powered by Miniflare):

```bash
# Under ./docs -- this directory ...
pnpm run dev

# or ... in root directory
pnpm run dev --filter ./worker
```

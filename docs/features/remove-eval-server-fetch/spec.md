---
process_id: feature
name: Remove eval from server-fetch
description: Kaizen action: Remove eval from server-fetch
---

# Feature: Remove eval from server-fetch

## Specification

The `server-fetch.ts` currently tries to load `https` via a sneaky `process.mainModule.require` hack which was designed to avoid Webpack/Edge runtime detection. As per architectural guidelines, we shouldn't do these dynamic requires / bypasses. The project operates within the Edge runtime where core modules like `https` cannot be loaded dynamically like this anyway. Instead we should rely exclusively on standard fetch.

The objective is to fix `src/lib/api/server-fetch.ts` by removing this non-standard, unsafe fallback behavior and just let it use fetch natively.

For development local https without valid certs, it's better to configure node (`NODE_TLS_REJECT_UNAUTHORIZED=0`) or simply use the built-in fetch if possible, rather than trying to load `https` via `require`. In newer Node/NextJS using native fetch will honor standard node options or we can pass a custom dispatcher/agent if it's node runtime, but here it's edge runtime where `https` isn't available anyway, so the `https` fallback won't even work and is just causing potential build issues.

Actually, the code in `server-fetch.ts` has:
```typescript
  // Bypass para que el Webpack (que analiza estáticamente import()) de Edge no trate de cargarlo.
  let https: typeof import("https") | undefined;
  if (typeof process !== "undefined" && process.env.NEXT_RUNTIME !== "edge") {
    try {
      https = typeof process !== "undefined" ? (process as any).mainModule.require("ht" + "tps") : null;
    } catch {
    }
  }
```

We will remove this whole block and simply use `fetch` for everything.

/**
 * Fetch server-side que en desarrollo acepta certificados autofirmados (HTTPS API local).
 * Solo para uso en servidor Next.js (authorize, API routes). En producción usa fetch normal.
 */

const isDev = process.env.NODE_ENV === "development";

function parseUrl(url: string): { hostname: string; port: string; path: string; protocol: string } {
  const u = new URL(url);
  return {
    hostname: u.hostname,
    port: u.port || (u.protocol === "https:" ? "443" : "80"),
    path: u.pathname + u.search,
    protocol: u.protocol,
  };
}

/**
 * POST a una URL. En desarrollo con HTTPS local, acepta certificado autofirmado.
 */
export async function serverPostJson<T = unknown>(
  url: string,
  body: object
): Promise<{ ok: boolean; status: number; data: T | null; errorText: string }> {
  if (!isDev || !url.startsWith("https://")) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const errorText = await res.text();
    let data: T | null = null;
    try {
      data = errorText ? (JSON.parse(errorText) as T) : null;
    } catch {
      // ignore
    }
    return { ok: res.ok, status: res.status, data, errorText };
  }

  const { hostname, port, path, protocol } = parseUrl(url);
  if (protocol !== "https:" || process.env.NEXT_RUNTIME === "edge") {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const errorText = await res.text();
    let data: T | null = null;
    try {
      data = errorText ? (JSON.parse(errorText) as T) : null;
    } catch {
      // ignore
    }
    return { ok: res.ok, status: res.status, data, errorText };
  }

  // Bypass para que el Webpack (que analiza estáticamente import()) de Edge no trate de cargarlo.
  let https: typeof import("https") | undefined;
  if (typeof process !== "undefined" && process.env.NEXT_RUNTIME !== "edge") {
    // Patrón permitido para evadir restricción estática en Edge Webpack y evitar uso de eval()
    try {
      if (typeof (globalThis as any).__non_webpack_require__ !== "undefined") {
         https = (globalThis as any).__non_webpack_require__("ht" + "tps");
      } else {
         const req = module.require;
         https = req("ht" + "tps");
      }
    } catch {
       // Ignore require failure if we run on edge/browser without native require
    }
  }

  if (!https) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const errorText = await res.text();
    let data: T | null = null;
    try {
      data = errorText ? (JSON.parse(errorText) as T) : null;
    } catch {}
    return { ok: res.ok, status: res.status, data, errorText };
  }

  const bodyStr = JSON.stringify(body);
  return new Promise((resolve) => {
    const options: import("https").RequestOptions = {
      hostname,
      port: port || "443",
      path,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(bodyStr, "utf8"),
      },
      rejectUnauthorized: false,
    };
    const req = https.request(options, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () => {
        const errorText = Buffer.concat(chunks).toString("utf8");
        let data: T | null = null;
        try {
          data = errorText ? (JSON.parse(errorText) as T) : null;
        } catch {
          // ignore
        }
        resolve({
          ok: res.statusCode !== undefined && res.statusCode >= 200 && res.statusCode < 300,
          status: res.statusCode ?? 0,
          data,
          errorText,
        });
      });
    });
    req.on("error", () => {
      resolve({ ok: false, status: 0, data: null, errorText: "Network error" });
    });
    req.write(bodyStr, "utf8");
    req.end();
  });
}

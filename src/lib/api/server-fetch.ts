/**
 * Fetch server-side para GesFer Admin.
 * En Edge runtime no podemos usar módulos nativos de node, así que utilizamos fetch.
 */

/**
 * POST a una URL usando fetch.
 */
export async function serverPostJson<T = unknown>(
  url: string,
  body: object
): Promise<{ ok: boolean; status: number; data: T | null; errorText: string }> {
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

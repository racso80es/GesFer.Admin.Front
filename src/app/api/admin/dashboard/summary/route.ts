import { NextResponse } from "next/server";
import { getAdminApiWithToken } from "@/lib/api/admin-api-server";
import { auth } from "@/auth";
import { sanitizeLogMessage } from "@/lib/utils/logger";

export const dynamic = "force-dynamic";

/**
 * Proxy del resumen del dashboard.
 * Evita CORS: el cliente llama a esta ruta (same-origin) y el servidor consulta la API Admin.
 */
export async function GET() {
  try {
    const session = await auth();
    const accessToken = session?.accessToken ?? (session as { accessToken?: string } | null)?.accessToken;
    if (!accessToken) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const api = getAdminApiWithToken(accessToken);
    const summary = await api.get<Record<string, unknown>>("/admin/dashboard/summary");
    return NextResponse.json(summary);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(sanitizeLogMessage(`Error fetching dashboard summary: ${message}`));
    return NextResponse.json(
      { error: "Error al obtener el resumen", detail: message },
      { status: 500 }
    );
  }
}

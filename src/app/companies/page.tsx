import { sanitizeLogMessage } from "@/lib/utils/logger";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/v2/button";
import { Plus, Pencil } from "lucide-react";
import { Company } from "@/lib/types/api";
import { auth } from "@/auth";
import { getAdminApiWithToken } from "@/lib/api/admin-api-server";

export default async function CompaniesPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "Admin") {
    redirect("/login");
  }

  let companies: Company[] = [];
  let loadError: string | null = null;

  try {
    const accessToken = session?.accessToken ?? (session as { accessToken?: string } | null)?.accessToken;
    if (!accessToken) {
      loadError = "Sesión no válida o expirada. Cierra sesión e inicia de nuevo.";
    } else {
      const api = getAdminApiWithToken(accessToken);
      companies = await api.get<Company[]>("/company");
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(sanitizeLogMessage(`Error fetching companies: ${message}`));
    loadError =
      "No se pudo conectar con el servidor. Comprueba que la API Admin esté en ejecución (ADMIN_API_URL) y vuelve a iniciar sesión si es necesario.";
  }

  return (
    <div className="voltagent-theme container mx-auto py-10 bg-background min-h-screen max-w-none text-foreground">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-sans tracking-tight">Organizaciones</h1>
        <Link href="/companies/new">
          <Button variant="voltagent-cta">
            <Plus className="mr-2 h-4 w-4" /> Nueva Organización
          </Button>
        </Link>
      </div>

      {loadError && (
        <div className="mb-4 rounded-md bg-destructive/10 border border-destructive p-4 text-destructive text-sm">
          {loadError}
        </div>
      )}
      <div className="bg-card rounded-md border border-border shadow-[rgba(92,88,85,0.2)_0px_0px_15px]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-black/20">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground font-sans uppercase tracking-wider text-xs">Nombre</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground font-sans uppercase tracking-wider text-xs">CIF/NIF</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground font-sans uppercase tracking-wider text-xs">Email</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground font-sans uppercase tracking-wider text-xs">Estado</th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground font-sans uppercase tracking-wider text-xs">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {companies.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-muted-foreground">
                  {loadError ? "No se pudieron cargar los datos." : "No hay organizaciones registradas"}
                </td>
              </tr>
            ) : (
              companies.map((company) => (
                <tr key={company.id} className="border-b border-border last:border-0 hover:bg-black/20">
                  <td className="py-3 px-4 text-foreground">{company.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{company.taxId || "-"}</td>
                  <td className="py-3 px-4 text-muted-foreground">{company.email || "-"}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium border ${
                        company.isActive
                          ? "bg-primary/10 text-emerald-signal border-emerald-signal/50"
                          : "bg-destructive/10 text-destructive border-destructive/50"
                      }`}
                    >
                      {company.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link href={`/companies/${company.id}/edit`}>
                      <Button variant="voltagent-ghost" size="sm" className="h-8 w-8 p-0">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

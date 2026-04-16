import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logs | GesFer Admin",
  description: "Registro de actividad y logs del sistema",
};

export default function LogsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Logs de Sistema</h2>
      </div>
      <div className="flex h-[400px] shrink-0 items-center justify-center rounded-md border border-dashed">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-10 w-10 text-muted-foreground"
            viewBox="0 0 24 24"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" x2="8" y1="13" y2="13"></line>
            <line x1="16" x2="8" y1="17" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <h3 className="mt-4 text-lg font-semibold">Visualizador de Logs</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            La funcionalidad completa de auditoría y logs del sistema estará disponible próximamente en esta sección.
          </p>
        </div>
      </div>
    </div>
  );
}

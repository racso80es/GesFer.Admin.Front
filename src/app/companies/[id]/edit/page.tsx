"use client";
import { sanitizeLogMessage } from "@/lib/utils/logger";

import { CompanyForm } from "@/components/companies/company-form";
import { useRouter } from "next/navigation";
import { CreateCompany, UpdateCompany, Company } from "@/lib/types/api";
import { useEffect, useState } from "react";

interface EditCompanyPageProps {
  params: {
    id: string;
  };
}

export default function EditCompanyPage({ params }: EditCompanyPageProps) {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`/api/companies/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch company");
        const data = await response.json();
        setCompany(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(sanitizeLogMessage(`Error fetching company: ${message}`));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompany();
  }, [params.id]);

  const handleSubmit = async (data: CreateCompany | UpdateCompany) => {
    setSubmitError(null);
    try {
      const response = await fetch(`/api/companies/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update company");
      }

      router.push("/companies");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(sanitizeLogMessage(`Error: ${message}`));
      setSubmitError(message);
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (!company) return <div>Organización no encontrada</div>;

  return (
    <div className="voltagent-theme container mx-auto py-10 bg-background min-h-screen max-w-none text-foreground">
      <h1 className="text-2xl font-bold mb-6 text-foreground font-sans tracking-tight">Editar Organización</h1>
      <div className="max-w-2xl bg-card border border-border p-6 rounded-lg shadow-[rgba(92,88,85,0.2)_0px_0px_15px]">
        {submitError && (
          <div className="mb-4 rounded-md bg-destructive/10 border border-destructive p-4 text-destructive text-sm">
            {submitError}
          </div>
        )}
        <CompanyForm
          company={company}
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
}

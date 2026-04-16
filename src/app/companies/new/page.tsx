"use client";

import { CompanyForm } from "../../../components/companies/company-form";
import { useRouter } from "next/navigation";
import { CreateCompany } from "@/lib/types/api";
import { useState } from "react";

export default function NewCompanyPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateCompany) => {
    setError(null);
    try {
      const response = await fetch("/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create company");
      }

      router.push("/companies");
      router.refresh();
    } catch (error) {
const message = error instanceof Error ? error.message : String(error);
      console.error("Error:", message);
      setError(message);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Nueva Organización</h1>
      <div className="max-w-2xl bg-white p-6 rounded-lg shadow">
        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-4 text-red-800 text-sm">
            {error}
          </div>
        )}
        <CompanyForm
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
}

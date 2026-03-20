"use client";

import { useState } from "react";
import { CompanyForm } from "../../../components/companies/company-form";
import { useRouter } from "next/navigation";
import { CreateCompany } from "@/lib/types/api";

export default function NewCompanyPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (data: CreateCompany) => {
    setErrorMsg(null);
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
      console.error(message, error);
      setErrorMsg(message);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Nueva Organización</h1>
      {errorMsg && <div className="text-red-500 mb-4 p-3 bg-red-100 rounded">{errorMsg}</div>}
      <div className="max-w-2xl bg-white p-6 rounded-lg shadow">
        <CompanyForm
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
}

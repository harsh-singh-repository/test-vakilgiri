"use client";

import React, { Suspense } from "react";
import ClientPageContent from "./_component/ClientPage";

export default function ClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientPageContent />
    </Suspense>
  );
}
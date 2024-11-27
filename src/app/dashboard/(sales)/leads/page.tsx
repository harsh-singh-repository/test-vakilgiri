"use client";

import React, { Suspense } from "react";
import LeadsPage from "./_component/LeadsPage";

export default function ClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeadsPage/>
    </Suspense>
  );
}
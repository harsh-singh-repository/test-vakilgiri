"use client";

import React, { Suspense } from "react";
import BusinessPage from "./_component/BussinessPage";

export default function ClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BusinessPage/>
    </Suspense>
  );
}
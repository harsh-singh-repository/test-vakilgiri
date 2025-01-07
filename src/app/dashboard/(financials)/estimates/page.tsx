"use client";

import React, { Suspense } from "react";
import EstimatePage from "./_component/EstimatePage";


export default function ClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EstimatePage/>
    </Suspense>
  );
}
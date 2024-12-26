"use client";

import React, { Suspense } from "react";
import RetailersPage from "./_component/RetailersPage";


export default function ClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RetailersPage/>
    </Suspense>
  );
}
"use client";

import React, { Suspense } from "react";
import TransactionPage from "./_component/TransactionPage";



export default function ClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransactionPage/>
    </Suspense>
  );
}
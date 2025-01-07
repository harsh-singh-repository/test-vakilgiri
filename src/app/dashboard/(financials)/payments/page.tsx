"use client";

import React, { Suspense } from "react";
import PaymentPage from "./_component/PaymentPage";


export default function ClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPage/>
    </Suspense>
  );
}
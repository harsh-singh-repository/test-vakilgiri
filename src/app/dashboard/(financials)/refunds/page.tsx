"use client";

import React, { Suspense } from "react";
import RefundPage from "./_component/RefundPage";


export default function ClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
       <RefundPage/>
    </Suspense>
  );
}
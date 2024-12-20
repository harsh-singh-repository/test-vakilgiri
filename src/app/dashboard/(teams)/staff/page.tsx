"use client";

import React, { Suspense } from "react";
import StaffPage from "./_component/StaffPage";


export default function ClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StaffPage/>
    </Suspense>
  );
}
"use client";

import React, { Suspense } from "react";
import RegistrationPageContent from "./_component/RegistationPage";

export default function ClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationPageContent/>
    </Suspense>
  );
}
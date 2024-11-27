"use client";

import React, { Suspense } from "react";
import ReminderPage from "./_component/ReminderPage";

export default function ClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReminderPage/>
    </Suspense>
  );
}
"use client";

import React, { Suspense } from "react";
import TicketPageContent from "./_component/TicketPage";

export default function ClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TicketPageContent />
    </Suspense>
  );
}

"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import BusinessPage with ssr: false
const BusinessPage = dynamic(() => import("./_component/BussinessPage"), {
  ssr: false,
});

export default function ClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BusinessPage />
    </Suspense>
  );
}

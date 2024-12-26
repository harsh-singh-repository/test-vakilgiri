"use client";

import React, { Suspense } from "react";
import ListingPage from "./_component/ListingPage";



export default function ClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListingPage/>
    </Suspense>
  );
}
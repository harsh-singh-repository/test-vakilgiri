"use client";

import React, { Suspense } from "react";
import ProjectPage from "./_component/ProjectPage";


export default function ClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectPage/>
    </Suspense>
  );
}
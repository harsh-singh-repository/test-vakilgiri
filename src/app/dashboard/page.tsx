import React from "react";
// import { getServerSession } from "next-auth";
import Results from "./_component/DashboardCards";
import ClientShowcase from "./_component/ClientShowcase";
import {BarGraph} from "./_component/Graphs";

const page = () => {
  return (
   <>
     <Results/>
     <BarGraph/>
     <ClientShowcase/>
   </>
  );
};

export default page;

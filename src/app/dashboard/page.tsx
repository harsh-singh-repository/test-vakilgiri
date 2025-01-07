import React from "react";
// import { getServerSession } from "next-auth";
import Results from "./_component/DashboardCards";
import ClientShowcase from "./_component/ClientShowcase";
import {BarGraph} from "./_component/Graphs";

const page = () => {
  // function TestError() {
  //   throw new Error('This is a test error');
  // }
  return (
   <>
     <Results/>
     <BarGraph/>
     <ClientShowcase/>
     {/* {
      TestError()
     } */}
   </>
  );
};

export default page;

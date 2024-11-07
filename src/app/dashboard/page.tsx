import React from "react";

import Results from "./_component/Results";
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

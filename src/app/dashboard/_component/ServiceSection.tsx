"use client"

// import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"
import { Briefcase, CircleDollarSign, Globe, CopyrightIcon as Trademark, Heart, Calculator, Code } from 'lucide-react'
import { ServiceCard } from "./ServiceCard"
import { Card } from '@/components/ui/card';

export const description = "A multiple bar chart"

// const chartData = [
//   { month: "January", desktop: 186},
//   { month: "February", desktop: 305},
//   { month: "March", desktop: 237},
//   { month: "April", desktop: 73},
//   { month: "May", desktop: 209},
//   { month: "June", desktop: 214},
//   { month: "June", desktop: 214},
//   { month: "June", desktop: 214},
//   { month: "June", desktop: 214},
//   { month: "June", desktop: 214},
// ]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   }
// } satisfies ChartConfig

const ServiceSection = () => {
  return (
    <Card className="w-full bg-white rounded-md py-3 max-h-fit"> 
     <div className='bg-[#091747] max-w-fit px-2 rounded-tl-none rounded-bl-none rounded-md'>
       <span className="text-[12px] font-normal text-navy-900 mb-8 text-white max-w-fit">Services</span>
      </div>
    <div className="container px-2">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
        <ServiceCard
          title="Start Business"
          icon={Briefcase}
          href="/services/start-business"
        />
        <ServiceCard
          title="GST"
          icon={CircleDollarSign}
          href="/services/gst"
        />
        <ServiceCard
          title="ISO"
          icon={Globe}
          href="/services/iso"
        />
        <ServiceCard
          title="Trademark"
          icon={Trademark}
          href="/services/trademark"
        />
        <ServiceCard
          title="FSSAI"
          imageUrl="/images/fssai-logo.svg"
          href="/services/fssai"
        />
        <ServiceCard
          title="NGO"
          icon={Heart}
          href="/services/ngo"
        />
        <ServiceCard
          title="ITR & Returns"
          icon={Calculator}
          href="/services/itr-returns"
        />
        <ServiceCard
          title="Web Development"
          icon={Code}
          href="/services/web-development"
        />
      </div>
    </div>
  </Card>
  );
};

export default ServiceSection;

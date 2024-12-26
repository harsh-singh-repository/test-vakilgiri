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
          href="/services/start-business"
          imageUrl='https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F59d8ae81b6141a70c4898737e58d02c0.cdn.bubble.io%2Ff1732364184745x751805092253727400%2FStart-Business.png?w=48&h=48&auto=compress&dpr=1&fit=max'
        />
        <ServiceCard
          title="GST"
          href="/services/start-business"
          imageUrl='https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F59d8ae81b6141a70c4898737e58d02c0.cdn.bubble.io%2Ff1732360343784x152571220951462000%2FGST.png?w=48&h=48&auto=compress&dpr=1&fit=max'
        />
        <ServiceCard
          title="ISO"
          // icon={Globe}
          href="/services/iso"
          imageUrl='https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F59d8ae81b6141a70c4898737e58d02c0.cdn.bubble.io%2Ff1732360371207x167733889479616100%2FISO.png?w=48&h=48&auto=compress&dpr=1&fit=max'
        />
        <ServiceCard
          title="Trademark"
          // icon={Trademark}
          href="/services/trademark"
          imageUrl='https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F59d8ae81b6141a70c4898737e58d02c0.cdn.bubble.io%2Ff1732360464188x499657664978959040%2FTM.png?w=48&h=48&auto=compress&dpr=1&fit=max'
        />
        <ServiceCard
          title="FSSAI"
          imageUrl="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F59d8ae81b6141a70c4898737e58d02c0.cdn.bubble.io%2Ff1732360485038x424319542194012900%2FFSSAI.png?w=48&h=48&auto=compress&dpr=1&fit=max"
          href="/services/fssai"
        />
        <ServiceCard
          title="NGO"
          // icon={Heart}
          href="/services/ngo"
          imageUrl='https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F59d8ae81b6141a70c4898737e58d02c0.cdn.bubble.io%2Ff1732360590671x709035852987086800%2Fcooperative-socitey-1.png?w=48&h=48&auto=compress&dpr=1&fit=max'
        />
        <ServiceCard
          title="ITR & Returns"
          // icon={Calculator}
          href="/services/itr-returns"
          imageUrl='https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F59d8ae81b6141a70c4898737e58d02c0.cdn.bubble.io%2Ff1732364121031x306655555755355200%2FITR.png?w=48&h=48&auto=compress&dpr=1&fit=max'
        />
        <ServiceCard
          title="Web Development"
          // icon={Code}
          href="/services/web-development"
          imageUrl='https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F59d8ae81b6141a70c4898737e58d02c0.cdn.bubble.io%2Ff1732617439209x617629542788183600%2FFab%2520Icon.png?w=48&h=48&auto=compress&dpr=1&fit=max'
        />
      </div>
    </div>
  </Card>
  );
};

export default ServiceSection;

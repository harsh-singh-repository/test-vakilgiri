import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const FinancialsPage = () => {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
    <TabsList>
      <TabsTrigger value="estimates">Estimates</TabsTrigger>
      <TabsTrigger value="invoice">Invoice</TabsTrigger>
      <TabsTrigger value="payments">Payment</TabsTrigger>
      <TabsTrigger value="expenses">Expenses</TabsTrigger>
    </TabsList>
    <TabsContent value="estimates">Make changes to your account here.</TabsContent>
    <TabsContent value="invoice">Change your password here.</TabsContent>
  </Tabs>
  
  )
}

export default FinancialsPage;
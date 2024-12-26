'use client'

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function ListingRegestration() {
  const [registrations, setRegistrations] = useState({
    "12ab": false,
    "80g": false,
    "fcra": false,
    "ngoDarpan": false,
    "csr1": false,
    "iso": false,
    "msme": false,
    "gst": false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted data:', registrations)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
        {/* 12AB Registration */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-semibold text-[13px]">1. Do you have 12AB Registration?</span>
              <p className="text-[10px] text-medium">
                This registration enables NGO to get exemption on donations under IncomeTax
              </p>
            </div>
            <Switch 
              checked={registrations["12ab"]}
              onCheckedChange={() => setRegistrations(prev => ({ ...prev, "12ab": !prev["12ab"] }))}
              className="data-[state=checked]:bg-red-500"
            />
          </div>
          {registrations["12ab"] && (
            <div className="space-y-4">
              <div>
                <Label>Type</Label>
                <Select defaultValue="Provisional">
                  <SelectTrigger className="border-neutral-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Provisional">Provisional</SelectItem>
                    <SelectItem value="Permanent">Permanent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>12AB Reg. Number</Label>
                <Input 
                  placeholder="12AB Registration Number"
                  className="border-neutral-300"
                />
              </div>
              <div>
                <Label>12AB Expiry Date</Label>
                <Input 
                  type="date"
                  placeholder="25/12/2024"
                  className="border-neutral-300"
                />
              </div>
            </div>
          )}
        </div>

        {/* 80G Registration */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-[13px]">2. Do you have 80G Registration?</h2>
              <p className="text-[10px] font-medium">
                This registration enables NGO to get exemption on donations under IncomeTax
              </p>
            </div>
            <Switch 
              checked={registrations["80g"]}
              onCheckedChange={() => setRegistrations(prev => ({ ...prev, "80g": !prev["80g"] }))}
              className="data-[state=checked]:bg-red-500"
            />
          </div>
          {registrations["80g"] && (
            <div className="space-y-4">
              <div>
                <Label>Type</Label>
                <Select defaultValue="Provisional">
                  <SelectTrigger className="border-neutral-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Provisional">Provisional</SelectItem>
                    <SelectItem value="Permanent">Permanent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>80g Reg. Number</Label>
                <Input 
                  placeholder="80G Registration Number"
                  className="border-neutral-300"
                />
              </div>
              <div>
                <Label>80G Expiry Date</Label>
                <Input 
                  type="date"
                  placeholder="25/12/2024"
                  className="border-neutral-300"
                />
              </div>
            </div>
          )}
        </div>

        {/* FCRA Registration */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className=" font-semibold text-[13px]">3. Do you have FCRA Registration?</h2>
              <p className="font-medium text-[10px]">
                This registration enables NGO to get exemption on donations under IncomeTax
              </p>
            </div>
            <Switch 
              checked={registrations["fcra"]}
              onCheckedChange={() => setRegistrations(prev => ({ ...prev, "fcra": !prev["fcra"] }))}
              className="data-[state=checked]:bg-red-500"
            />
          </div>
          {registrations["fcra"] && (
            <div className="space-y-4">
              <div>
                <Label>Type</Label>
                <Select defaultValue="Provisional">
                  <SelectTrigger className="border-neutral-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Provisional">Provisional</SelectItem>
                    <SelectItem value="Permanent">Permanent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>FCRA Reg. Number</Label>
                <Input 
                  placeholder="FCRA Registration Number"
                  className="border-neutral-300"
                />
              </div>
              <div>
                <Label>FCRA Expiry Date</Label>
                <Input 
                  type="date"
                  placeholder="25/12/2024"
                  className="border-neutral-300"
                />
              </div>
            </div>
          )}
        </div>

        {/* NGO Darpan Registration */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-[13px]">8. Do you have NGO Darpan Registration?</h2>
              <p className="font-medium text-[10px]">
                This registration enables NGO to get exemption on donations under IncomeTax
              </p>
            </div>
            <Switch 
              checked={registrations["ngoDarpan"]}
              onCheckedChange={() => setRegistrations(prev => ({ ...prev, "ngoDarpan": !prev["ngoDarpan"] }))}
              className="data-[state=checked]:bg-red-500"
            />
          </div>
          {registrations["ngoDarpan"] && (
            <div className="space-y-4">
              <div>
                <Label>NGO Darpan</Label>
                <Input 
                  placeholder="Darpan Number"
                  className="border-neutral-300"
                />
              </div>
            </div>
          )}
        </div>

        {/* CSR-1 Registration */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-[13px]">5. Do you have CSR-1 Registration?</h2>
              <p className="font-medium text-[10px]">
                This registration enables NGO to get exemption on donations under IncomeTax
              </p>
            </div>
            <Switch 
              checked={registrations["csr1"]}
              onCheckedChange={() => setRegistrations(prev => ({ ...prev, "csr1": !prev["csr1"] }))}
              className="data-[state=checked]:bg-red-500"
            />
          </div>
          {registrations["csr1"] && (
            <div className="space-y-4">
              <div>
                <Label>CSR-1 Reg. Number</Label>
                <Input 
                  placeholder="CSR-1 Registration Number"
                  className="border-neutral-300"
                />
              </div>
            </div>
          )}
        </div>

        {/* ISO Registration */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-[13px]">4. Do you have ISO Registration?</h2>
              <p className="font-medium text-[10px]">
                This registration enables NGO to get exemption on donations under IncomeTax
              </p>
            </div>
            <Switch 
              checked={registrations["iso"]}
              onCheckedChange={() => setRegistrations(prev => ({ ...prev, "iso": !prev["iso"] }))}
              className="data-[state=checked]:bg-red-500"
            />
          </div>
          {registrations["iso"] && (
            <div className="space-y-4">
              <div>
                <Label>ISO Reg. Number</Label>
                <Input 
                  placeholder="ISO Number"
                  className="border-neutral-300"
                />
              </div>
              <div>
                <Label>ISO Expiry Date</Label>
                <Input 
                  type="date"
                  placeholder="25/12/2024"
                  className="border-neutral-300"
                />
              </div>
            </div>
          )}
        </div>

        {/* MSME Registration */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-[13px]">6. Do you have MSME Registration?</h2>
              <p className="font-medium text-[10px]">
                This registration enables NGO to get exemption on donations under IncomeTax
              </p>
            </div>
            <Switch 
              checked={registrations["msme"]}
              onCheckedChange={() => setRegistrations(prev => ({ ...prev, "msme": !prev["msme"] }))}
              className="data-[state=checked]:bg-red-500"
            />
          </div>
          {registrations["msme"] && (
            <div className="space-y-4">
              <div>
                <Label>MSME Reg. Number</Label>
                <Input 
                  placeholder="MSME Number"
                  className="border-neutral-300"
                />
              </div>
            </div>
          )}
        </div>

        {/* GST Registration */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-[13px]">7. Do you have GST Registration?</h2>
              <p className="font-medium text-[10px]">
                This registration enables NGO to get exemption on donations under IncomeTax
              </p>
            </div>
            <Switch 
              checked={registrations["gst"]}
              onCheckedChange={() => setRegistrations(prev => ({ ...prev, "gst": !prev["gst"] }))}
              className="data-[state=checked]:bg-red-500"
            />
          </div>
          {registrations["gst"] && (
            <div className="space-y-4">
              <div>
                <Label>GST Number</Label>
                <Input 
                  placeholder="GSTIN"
                  className="border-neutral-300"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button type="submit" className="bg-red-600 hover:bg-red-700">
          Save & Proceed
        </Button>
      </div>
    </form>
  )
}


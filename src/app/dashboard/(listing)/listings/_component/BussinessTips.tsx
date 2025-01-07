import * as React from "react";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function BusinessTips() {
  const [isOpen, setIsOpen] = React.useState<string | null>("price");

  const tips = [
    {
      id: "gather",
      title: "Gather all necessary information",
      content:
        "Collect all relevant documentation and data about your business operations, financials, and assets.",
    },
    {
      id: "listing",
      title: "Create an engaging listing",
      content:
        "Write a compelling description that highlights your business's unique value proposition and potential.",
    },
    {
      id: "price",
      title: "Set a realistic price",
      content:
        "Price your business realistically based on its market value, financial performance, and industry trends. Be open to negotiation, but don't undervalue your business or set an unrealistic asking price that could turn off potential buyers.",
    },
    {
      id: "respond",
      title: "Respond promptly to inquiries",
      content:
        "Maintain timely and professional communication with all potential buyers.",
    },
    {
      id: "transparent",
      title: "Be open and transparent",
      content:
        "Provide honest and complete information about your business to build trust with potential buyers.",
    },
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <div className="space-y-1 bg-[#E2E2E2] rounded-lg">
        <div className="p-3">
          <div className="flex gap-1 text-[12px] font-semibold">
            <span>Completion</span>
            <span>(56%)</span>
          </div>
          <Progress value={56} className="h-2" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Tips</h2>
        <div className="space-y-2">
          {tips.map((tip) => (
            <Collapsible
              key={tip.id}
              open={isOpen === tip.id}
              onOpenChange={() => setIsOpen(isOpen === tip.id ? null : tip.id)}
            >
              <CollapsibleTrigger className="w-full text-left px-4 py-2 text-[12px] bg-[#091747] text-white rounded-md transition-colors">
                {tip.title}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 p-4 bg-[#E2E2E2] rounded-md text-black text-[12px] text-medium">
                  {tip.content}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}

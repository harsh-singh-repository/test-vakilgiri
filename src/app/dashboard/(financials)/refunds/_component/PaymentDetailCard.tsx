import { Badge } from "@/components/ui/badge"
import { useGetPaymentsById } from "@/hooks/payments/manage-payments";
import { X } from "lucide-react";

interface PaymentDetail {
  label: string
  value: string
}

interface PaymentDetailCardProp{
    onClose:()=>void;
    openDialogId:string;
}

export default function PaymentDetailCard({onClose,openDialogId}:PaymentDetailCardProp) {

    const {data} = useGetPaymentsById(openDialogId)

    console.log("Dialog Data",data)
    
  const paymentDetails: PaymentDetail[] = [
    { label: "Project", value: "[P165] GST Registration" },
    { label: "Estimate", value: "E/Jan25/240" },
    { label: "Business", value: "VAKILGIRI LEGTECH (INDIA) PRIVATE LIMITED" },
    { label: "Reference id", value: "wtInCRTSdt" },
    { label: "Invoice No", value: "E/Jan25/240" },
    { label: "Payment Date", value: "Jan 8, 2025 2:13 pm" },
    { label: "Payment Mode", value: "Wallet" },
    { label: "Amount", value: "Rs.1180" },
  ]

  return (
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-center p-3">
          <div className="text-[20px] text-[#031747] text-center font-semibold">
            Payment Details | PAY29
          </div>
          <X onClick={onClose} className="text-[#f21300] cursor-pointer absolute translate-x-56"  strokeWidth={"5"} size={20}/>
        </div>
        <div className="grid p-2">
          {paymentDetails.map((detail, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-start"
            >
              <div className="font-bold text-[#031747] text-[14px]">{detail.label}:</div>
              <div className="text-[#031747] text-[14px]">{detail.value}</div>
            </div>
          ))}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 items-start">
            <div className="font-medium text-navy-800">Payment Status:</div>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-3 rounded-full w-fit">
              Completed
            </Badge>
          </div>
        </div>
      </div>
  )
}


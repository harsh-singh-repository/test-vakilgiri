import { type LucideIcon } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

interface ServiceCardProps {
  title: string
  icon?: LucideIcon
  imageUrl?: string
  href: string
}

export function ServiceCard({ title, icon: Icon, imageUrl, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center px-1 py-0 rounded-lg transition-colors hover:bg-[#FFDADA]"
    >
      <div className="w-16 h-16 flex items-center justify-center">
        {Icon ? (
          <Icon className="w-10 h-10 text-[#091747]" />
        ) : (
          imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              width={40}
              height={40}
              className="object-contain"
            />
          )
        )}
      </div>
      <span className="text-[12px] leading-none font-medium text-center text-[#091747]">{title}</span>
    </Link>
  )
}

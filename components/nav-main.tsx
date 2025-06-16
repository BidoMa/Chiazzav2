"use client"

import * as React from "react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
    isActive?: boolean
  }[]
}

interface NavMainProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[]
}

export function NavMain({ items, className, ...props }: NavMainProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      {items.map((item, index) => (
        <NavItemWithSub key={index} item={item} />
      ))}
    </div>
  )
}

function NavItemWithSub({
  item,
}: {
  item: NavItem
}) {
  const [open, setOpen] = React.useState(false)
  const Icon = item.icon

  return (
    <div>
      <Link
        href={item.url}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted/50",
          item.isActive && "bg-muted font-semibold",
        )}
        onClick={(e) => {
          if (item.items?.length) {
            e.preventDefault()
            setOpen(!open)
          }
        }}
      >
        {Icon && <Icon className="h-4 w-4" />}
        <span className="flex-1 truncate">{item.title}</span>
        {item.items?.length && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </Link>
      {item.items?.length && open && (
        <div className="mt-1 pl-6 pr-2">
          {item.items.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.url}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted/50",
                subItem.isActive && "bg-muted font-semibold",
              )}
            >
              <span className="flex-1 truncate">{subItem.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

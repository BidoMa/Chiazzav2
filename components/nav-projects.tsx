import type React from "react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Project {
  name: string
  url: string
  icon?: LucideIcon
}

interface NavProjectsProps extends React.HTMLAttributes<HTMLDivElement> {
  projects: Project[]
}

export function NavProjects({ projects, className, ...props }: NavProjectsProps) {
  return (
    <div className={cn("mt-4 space-y-1", className)} {...props}>
      <div className="px-3 text-xs font-semibold text-muted-foreground">Proyectos</div>
      <div className="mt-2 space-y-1">
        {projects.map((project, index) => {
          const Icon = project.icon
          return (
            <Link
              key={index}
              href={project.url}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted/50"
            >
              {Icon && <Icon className="h-4 w-4" />}
              <span className="truncate">{project.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

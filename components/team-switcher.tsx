"use client"

import * as React from "react"
import { Check, ChevronsUpDown, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Team {
  name: string
  logo: LucideIcon
  plan: string
}

interface TeamSwitcherProps {
  teams: Team[]
}

export function TeamSwitcher({ teams }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedTeam, setSelectedTeam] = React.useState(teams[0])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          <div className="flex items-center gap-2 truncate">
            {selectedTeam.logo && <selectedTeam.logo className="h-4 w-4 shrink-0" />}
            <span className="truncate">{selectedTeam.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar equipo..." />
          <CommandList>
            <CommandEmpty>No se encontraron equipos.</CommandEmpty>
            <CommandGroup>
              {teams.map((team) => (
                <CommandItem
                  key={team.name}
                  onSelect={() => {
                    setSelectedTeam(team)
                    setOpen(false)
                  }}
                  className="text-sm"
                >
                  <div className="flex items-center gap-2 truncate">
                    {team.logo && <team.logo className="h-4 w-4 shrink-0" />}
                    <span className="truncate">{team.name}</span>
                  </div>
                  <Check
                    className={cn("ml-auto h-4 w-4", selectedTeam.name === team.name ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

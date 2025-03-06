import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function ProfitableTasks() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary text-primary-foreground">UX</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">UX istraživanje za mobilnu aplikaciju</p>
          <p className="text-sm text-muted-foreground">
            Zarada: €2,500.00 | ROI: 133.33 €/h
          </p>
        </div>
        <div className="ml-auto font-medium">Investicija</div>
      </div>
      {/* Dodajte ostale zadatke iz originalnog koda */}
    </div>
  )
}
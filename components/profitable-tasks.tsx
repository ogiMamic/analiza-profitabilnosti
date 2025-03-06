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
          <p className="text-sm text-muted-foreground">Zarada: €2,500.00 | ROI: 133.33 €/h</p>
        </div>
        <div className="ml-auto font-medium">Investicija</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary text-primary-foreground">BE</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Razvoj backend funkcionalnosti</p>
          <p className="text-sm text-muted-foreground">Očekivana zarada: €3,000.00 | Očekivani ROI: 100.00 €/h</p>
        </div>
        <div className="ml-auto font-medium">Investicija</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary text-primary-foreground">SEO</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">SEO optimizacija za web shop</p>
          <p className="text-sm text-muted-foreground">Zarada: €1,200.00 | ROI: 95.83 €/h</p>
        </div>
        <div className="ml-auto font-medium">Investicija</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary text-primary-foreground">WEB</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Dizajn web stranice</p>
          <p className="text-sm text-muted-foreground">Zarada: €1,200.00 | ROI: 50.00 €/h</p>
        </div>
        <div className="ml-auto font-medium">Direktno naplativo</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary text-primary-foreground">FB</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Facebook kampanja za klijenta Y</p>
          <p className="text-sm text-muted-foreground">Očekivana zarada: €800.00 | Očekivani ROI: 60.00 €/h</p>
        </div>
        <div className="ml-auto font-medium">Investicija</div>
      </div>
    </div>
  )
}


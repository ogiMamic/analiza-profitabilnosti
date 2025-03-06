"use client"

import * as React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DatePicker>

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DatePicker
      inline
      className={cn("p-3", className)}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="flex items-center justify-between px-2 py-1">
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className={buttonVariants({ variant: "outline" })}
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="text-sm font-medium">
            {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </div>
          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className={buttonVariants({ variant: "outline" })}
            type="button"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
      {...props}
    />
  )
}
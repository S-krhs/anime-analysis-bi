'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const weekdays: Array<string> = ['日', '月', '火', '水', '木', '金', '土']
const months: Array<string> = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

export default function DateRangePicker({ className }: { className?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [date, setDate] = useState<DateRange | undefined>()

  useEffect(() => {
    const startParam = searchParams.get('start')
    const endParam = searchParams.get('end')
    if (startParam && endParam) {
      setDate({
        from: new Date(startParam),
        to: new Date(endParam)
      })
    }
  }, [searchParams])

  const updateUrlParams = (newDate: DateRange | undefined) => {
    if (newDate?.from && newDate?.to) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('start', format(newDate.from, 'yyyy-MM-dd'))
      params.set('end', format(newDate.to, 'yyyy-MM-dd'))
      router.push(`?${params.toString()}`)
    }
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'yyyy年MM月dd日', { locale: ja })} -{' '}
                  {format(date.to, 'yyyy年MM月dd日', { locale: ja })}
                </>
              ) : (
                format(date.from, 'yyyy年MM月dd日', { locale: ja })
              )
            ) : (
              <span>期間を選択してください</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate)
              updateUrlParams(newDate)
            }}
            numberOfMonths={2}
            locale={ja}
            classNames={{
              day_selected: "bg-primary text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
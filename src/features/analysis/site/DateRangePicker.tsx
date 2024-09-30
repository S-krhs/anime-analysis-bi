'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

const DateRangePicker: React.FC = () => {
  const [date1, setDate1] = useState<string>('2023-10-01')
  const [date2, setDate2] = useState<string>('2024-03-31')

  const router = useRouter()
  const currentPath = usePathname()
  const searchParams = useSearchParams()

  const onSearch = () => {
    const params = new URLSearchParams(searchParams)
    params.set('sdate', date1)
    params.set('edate', date2)
    router.replace(`${currentPath}?${params.toString()}`)
  }

  return (
    <>
      <input
        type="text"
        value={date1}
        onChange={(e) => setDate1(e.target.value)}
        className="border"
        />
      <input
        type="text"
        value={date2}
        onChange={(e) => setDate2(e.target.value)}
        className="border"
        />
        <Button className="h-6 rounded-none ml-4"
          onClick={() => onSearch()}
        >検索</Button>
    </>
  )
}
export default DateRangePicker
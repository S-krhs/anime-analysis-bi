'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

const DateRangePicker: React.FC = () => {
  const [date1, setDate1] = useState<string>('')
  const [date2, setDate2] = useState<string>('')

  const router = useRouter()
  const currentPath = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    setDate1(params.get('sdate') ?? '2024-04-01')
    setDate2(params.get('edate') ?? '2024-06-30')
  }, [])

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
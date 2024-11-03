'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams, usePathname } from "next/navigation"


// 今期/前期/今年～2022年四半期ごと


const DateRangePicker: React.FC = () => {
  const [sdate, setSDate] = useState<string>('')
  const [edate, setEDate] = useState<string>('')

  const router = useRouter()
  const currentPath = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    setSDate(params.get('sdate') ?? '')
    setEDate(params.get('edate') ?? '')
  }, [])

  const onSearch = () => {
    const params = new URLSearchParams(searchParams)
    if(sdate) params.set('sdate', sdate)
    if(edate) params.set('edate', edate)
    router.replace(`${currentPath}?${params.toString()}`)
  }

  return (
    <>
      <input
        type="text"
        value={sdate ?? undefined}
        onChange={(e) => setSDate(e.target.value)}
        className="border"
        />
      <input
        type="text"
        value={edate ?? undefined}
        onChange={(e) => setEDate(e.target.value)}
        className="border"
        />
        <Button className="h-6 rounded-none ml-4"
          onClick={() => onSearch()}
        >検索</Button>
    </>
  )
}
export default DateRangePicker
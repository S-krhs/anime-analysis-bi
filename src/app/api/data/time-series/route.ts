import { NextRequest, NextResponse } from 'next/server'
import { supabaseClient } from '@/lib/supabase'

type GetScrapingData = {
  scraping_id: number
  job_id: number
  date: string
  website_name: string
  attribute_name: string
  title: string
  value: number
  cron_execution_timestamp: number
}
type TimeSeriesData = {
  date: string
  data: {
    title: string
    value: number
  }[]
}
type TitlesData = {
  title: string
}

export const GET = async (req: NextRequest) => {
  const { data, error, status } = await supabaseClient
  .rpc('get_scraping_data', { _start_date: '2024-01-01', _end_date: '2024-03-31', _website_id: 1 })

  console.log("data: ", data, error, status)
  const timeSeriesData = data.reduce((acc: TimeSeriesData[], curr: GetScrapingData) => {
    const sameDateData = acc.find(elem => elem.date === curr.date)
    if(sameDateData){
      sameDateData.data.push({ title: curr.title, value: curr.value })
    }else{
      acc.push({
        date: curr.date,
        data: [{ title: curr.title, value: curr.value }]
      })
    }
    return acc
  }, [])
  const titles: string[] = [...new Set<string>(data.map((elem: GetScrapingData) => elem.title))]
  const titlesData: TitlesData[] = titles.map((elem: string) => {
    return ({ title: elem })
  })

  const res = NextResponse.json({
    timeSeriesData: timeSeriesData,
    titlesData: titlesData,
  })
  return res
}
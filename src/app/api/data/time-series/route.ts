import { NextRequest, NextResponse } from 'next/server'
import { supabaseClient } from '@/lib/supabase'
import type { TimeSeriesDataItem, SelectTimeSeriesDataItem } from '@/types/apis'

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const sdate = searchParams.get('sdate')
  const edate = searchParams.get('edate')
  const wid = searchParams.get('wid')
  const aid = searchParams.get('aid')

  const { data, error, status } = await supabaseClient
  .rpc('get_time_series_data', {
    sdate: sdate,
    edate: edate,
    wid: wid,
    aid: aid,
  })
  console.log("data: ", data, error, status)

  const timeSeriesData: TimeSeriesDataItem[] = data.reduce((acc: TimeSeriesDataItem[], curr: SelectTimeSeriesDataItem) => {
    const sameDateItem = acc.find(elem => elem.date === curr.date)
    if(sameDateItem){
      sameDateItem.data.push({ title: curr.title, value: curr.value })
    }else{
      acc.push({
        date: curr.date,
        data: [{ title: curr.title, value: curr.value }]
      })
    }
    return acc
  }, [])

  const response = NextResponse.json(timeSeriesData)
  return response
}
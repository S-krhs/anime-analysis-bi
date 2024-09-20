import { NextRequest, NextResponse } from 'next/server'
import { supabaseClient } from '@/lib/supabase'
import type { SelectTableDataItem, TableDataItem } from '@/types/apis'

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const sdate = searchParams.get('sdate')
  const edate = searchParams.get('edate')
  const wid = searchParams.get('wid')

  const { data, error, status } = await supabaseClient
  .rpc('get_table_data', {
    sdate: sdate,
    edate: edate,
    wid: wid,
  })
  console.log("data: ", data, error, status)

  const attributes: string[] = [...new Set<string>(data.map((elem: SelectTableDataItem) => elem.attribute_name))]
  const tableData: TableDataItem[] = data.reduce((acc: TableDataItem[], curr: SelectTableDataItem) => {
    const sameTitleItem = acc.find(elem => elem.title === curr.title)
    if(sameTitleItem){
      sameTitleItem[curr.attribute_name] = curr.avarage_value
    }else{
      acc.push({
        title: curr.title,
        [curr.attribute_name]: curr.avarage_value
      })
    }
    return acc
  }, [])

  const response = NextResponse.json(tableData)
  return response
}
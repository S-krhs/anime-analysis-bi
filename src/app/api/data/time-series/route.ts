import { NextRequest, NextResponse } from 'next/server'
import { supabaseClient } from '@/lib/supabase'
import { GetTimeSeriesDataRequest, GetTimeSeriesData } from '@/types/api'
import { SelectTimeSeriesDataRequest, SelectTimeSeriesDataItem } from '@/types/database'
import { DEFAULT_SDATE, DEFAULT_EDATE, FUNC_GET_TIME_SERIES_DATA } from '@/constants/database'
import { ERROR_MESSAGE_URL } from '@/constants/api'

/**
 * GET: 時系列データの取得
 * @params GetTimeSeriesDataRequest
 * @returns GetTimeSeriesData
 * 
 */
export const GET = async (req: NextRequest) => {
  try {
    /*
      パラメータの取得
      ———————————————*/
    const searchParams = req.nextUrl.searchParams
    const wid = searchParams.get('wid')
    const aid = searchParams.get('aid')

    // widとaidがない場合エラー todo
    if( !wid || !aid ){ throw(ERROR_MESSAGE_URL) }

    const params: GetTimeSeriesDataRequest = {
      sdate: searchParams.get('sdate'),
      edate: searchParams.get('edate'),
      wid: wid,
      aid: aid,
    }

    /*
      DBからデータの取得
      ———————————————*/
    const query: SelectTimeSeriesDataRequest = {
      sdate: params.sdate ?? DEFAULT_SDATE,
      edate: params.edate ?? DEFAULT_EDATE,
      wid: Number(params.wid),
      aid: Number(params.aid),
    }
    const { data, error }  = await supabaseClient
    .rpc(FUNC_GET_TIME_SERIES_DATA, query)
    if(error){ throw(error) }

    /*
      データの整形
      ———————————————*/
    const timeSeriesData: GetTimeSeriesData = data.reduce((
      acc: GetTimeSeriesData,
      curr: SelectTimeSeriesDataItem
    ) => {
      const sameDateItem = acc.find(elem => elem.date === curr.date)
      if(sameDateItem) {
        sameDateItem.data.push({ title: curr.title, value: curr.value })
      } else {
        acc.push({
          date: curr.date,
          data: [{ title: curr.title, value: curr.value }]
        })
      }
      return acc
    }, [])

    /*
      返却値の生成
      ———————————————*/
    const response: NextResponse<GetTimeSeriesData> = NextResponse.json(timeSeriesData)
    return response

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
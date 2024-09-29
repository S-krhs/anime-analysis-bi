import { NextRequest, NextResponse } from 'next/server'
import { GetTimeSeriesDataRequest, GetTimeSeriesData } from '@/types/api'
import { getTimeSeriesDataLogic } from './business'

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
    const params: GetTimeSeriesDataRequest = {
      sdate: searchParams.get('sdate'),
      edate: searchParams.get('edate'),
      wid: searchParams.get('wid'),
      aid: searchParams.get('aid'),
    }

    /*
      返却値の生成
      ———————————————*/
    const timeSeriesData: GetTimeSeriesData = await getTimeSeriesDataLogic(params)
    const response = NextResponse.json(timeSeriesData)
    return response

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
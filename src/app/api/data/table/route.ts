import { NextRequest, NextResponse } from 'next/server'
import { GetTableDataRequest, GetTableData } from '@/types/api'
import { getTableDataLogic } from './business'

/**
 * GET: テーブルデータの取得
 * @params GetTableDataRequest
 * @returns GetTableData
 * 
 */
export const GET = async (req: NextRequest) => {
  try {
    /*
      パラメータの取得
      ———————————————*/
    const searchParams = req.nextUrl.searchParams
    const params: GetTableDataRequest = {
      sdate: searchParams.get('sdate'),
      edate: searchParams.get('edate'),
      wid: searchParams.get('wid'),
    }

    /*
      返却値の生成
      ———————————————*/
    const tableData: GetTableData = await getTableDataLogic(params)
    const response = NextResponse.json(tableData)
    return response

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { GetMenuData } from '@/types/api'
import { getMenuDataLogic } from './business'

/**
 * GET: テーブルデータの取得
 * @params GetTableDataRequest
 * @returns GetTableData
 * 
 */
export const GET = async (req: NextRequest) => {
  try {
    /*
      返却値の生成
      ———————————————*/
    const menuData: GetMenuData = await getMenuDataLogic()
    const response = NextResponse.json(menuData)
    return response

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
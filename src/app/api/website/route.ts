import { NextRequest, NextResponse } from 'next/server'
import { GetWebsiteData, GetWebsiteDataRequest } from '@/types/api'
import { getWebsiteDataLogic } from './business'

/**
 * GET: サイトの属性データの取得
 * @params GetWebsiteDataRequest
 * @returns GetWebsiteData
 * 
 */
export const GET = async (req: NextRequest) => {
  try {
    /*
      パラメータの取得
      ———————————————*/
    const searchParams = req.nextUrl.searchParams
    const params: GetWebsiteDataRequest = {
      wid: searchParams.get('wid'),
    }

    /*
      返却値の生成
      ———————————————*/
    const attributeData: GetWebsiteData = await getWebsiteDataLogic(params)
    const response = NextResponse.json(attributeData)
    return response

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
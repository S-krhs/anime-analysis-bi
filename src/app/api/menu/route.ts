import { NextRequest, NextResponse } from 'next/server'
import { supabaseClient } from '@/lib/supabase'
import { GetMenuData } from '@/types/api'
import { SelectWebsitesDataItem, SelectAttributesDataItem } from '@/types/database'
import { VIEW_ATTRIBUTES, VIEW_WEBSITES } from '@/constants/database'
import { defaultWebsiteIconUrl } from '@/constants/urls'

/**
 * GET: テーブルデータの取得
 * @params GetTableDataRequest
 * @returns GetTableData
 * 
 */
export const GET = async (req: NextRequest) => {
  try {
    /*
      DBからデータの取得
      ———————————————*/
    // ウェブサイト一覧
    const { data: data1, error: error1 } = await supabaseClient
    .from(VIEW_WEBSITES)
    .select()
    if(error1){ throw(error1) }
    // データ属性一覧
    const { data: data2, error: error2 } = await supabaseClient
    .from(VIEW_ATTRIBUTES)
    .select()
    if(error2){ throw(error2) }

    /*
      データの整形
      ———————————————*/
    const menuData: GetMenuData = data1.map((website: SelectWebsitesDataItem) => {
      const attributes = data2
        .filter((attribute: SelectAttributesDataItem) => attribute.website_id === website.website_id)
      return {
        ...website,
        icon_url: website.icon_url ?? defaultWebsiteIconUrl,
        attributes: attributes
      }
    })
    
    /*
      返却値の生成
      ———————————————*/
    const response = NextResponse.json(menuData)
    return response

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
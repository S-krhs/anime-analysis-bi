/* コンポーネントのProps型を記述 */

import { TableDataItem, TimeSeriesDataItem } from "./api"

/*---------------------------------
  サーバコンポーネントのProps
 ---------------------------------*/

// サイドメニュー
export type MenuData = {
  website_id: number
  display_name: string
  index: number
  icon_url: string
  attributes: {
    attribute_id: number
    display_name: string
    index: number
  }[]
}[]
export type MenuDataProps = {
  menuData: MenuData
}

// ページ: (analysis)/site
export type WebsiteData = {
  website_id: number
  display_name: string
  index: number
  icon_url: string
  attributes: {
    attribute_id: number
    display_name: string
    website_id: number
    index: number
    lower_value: number | null
    upper_value: number | null
    reversed: boolean
  }[]
}
export type WebsiteDataProps = {
  websiteData: WebsiteData
}


/*---------------------------------
  クライアントコンポーネントのProps
 ---------------------------------*/

/*
  analisys関連
——————————————————*/

// 時系列データグラフ
export type AnalysisWebsiteAppProps = {
  tableData: TableDataItem[]
  websiteData: WebsiteData
  timeSeriesData: TimeSeriesDataItem[]
}

// 一覧テーブル
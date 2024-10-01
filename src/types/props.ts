/* コンポーネントのProps型を記述 */

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

export type TableDataItem = {
  title: string
  [key: string]: number | string
}
export type TimeSeriesDataItem = {
  date: string
  data: {
    title: string
    value: number
  }[]
}
export type AnalysisWebsiteAppProps = {
  tableData: TableDataItem[]
  websiteData: WebsiteData
  timeSeriesDataList: TimeSeriesDataItem[][]
}

// 一覧テーブル
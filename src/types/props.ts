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

// 時系列データグラフ
export type TimeSeriesDataItem = {
  date: string
  data: {
    title: string
    value: number
  }[]
}
export type TitlesArrayItem = {
  title: string
}
export type TimeSeriesGraphProps = {
  timeSeriesData: TimeSeriesDataItem[]
  titlesArray: TitlesArrayItem[]
  attributeName: string
  lowerValue: number | null
  upperValue: number | null
  reversed: boolean
}

// 一覧テーブル
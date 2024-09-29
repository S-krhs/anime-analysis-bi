/* コンポーネントのProps型を記述
   componentsディレクトリのPropsはcomponents内に記述 */

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
    upper_value: number | null
    lower_value: number | null
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
  startDate: string
  endDate: string
  upperScore: number
  lowerScore: number
}

// 一覧テーブル
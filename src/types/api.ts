/* APIのI/O型を記述 */

// api/data/time-series
export type GetTimeSeriesDataRequest = {
  sdate: string | null
  edate: string | null
  wid: string | null
  aid: string | null
}
export type GetTimeSeriesDataItem = {
  date: string
  data: {
    title: string
    value: number
  }[]
}
export type GetTimeSeriesData = GetTimeSeriesDataItem[]

// api/data/table
export type GetTableDataRequest = {
  sdate: string | null
  edate: string | null
  wid: string | null
  attr?: string
  asc?: boolean
  limit?: number
}
export type GetTableData = {
  title: string
  [key: string]: number | string
}[]


// api/menu
export type GetMenuData = {
  website_id: number
  display_name: string
  index: number
  icon_url: string
  header_image_url: string | null
  description: string | null
  data_label: string | null
  data_value: string | null
  attributes: {
    attribute_id: number
    display_name: string
    website_id: number
    index: number
  }[]
}[]

// api/website
export type GetWebsiteDataRequest = {
  wid: string | null
}
export type GetWebsiteData = {
  website_id: number
  display_name: string
  index: number
  icon_url: string
  header_image_url: string | null
  description: string | null
  data_label: string | null
  data_value: string | null
  attributes: {
    attribute_id: number
    display_name: string
    website_id: number
    index: number
    upper_value: number | null
    lower_value: number | null
    reversed: boolean
  }[]
}

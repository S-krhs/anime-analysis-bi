/* supabase関数のクエリ型を記述 */

// api/data/time-series
export type ModelTimeSeriesDataRequest = {
  sdate: string | null
  edate: string | null
  wid: number
  aid: number
}
export type ModelTimeSeriesDataItem = {
  scraping_id: number
  job_id: number
  date: string
  website_id: number
  website_name: string
  attribute_id: number
  attribute_name: string
  title: string
  value: number
  cron_execution_timestamp: number
}


// api/data/table
export type ModelTableDataRequest = {
  sdate: string | null
  edate: string | null
  wid: number
}
export type ModelTableDataItem = {
  display_name: string
  title: string
  avarage_value: number
}

// api/menu
export type ModelWebsitesDataItem = {
  website_id: number
  display_name: string
  index: number
  icon_url: string | null
}
export type ModelAttributesDataItem = {
  attribute_id: number
  display_name: string
  website_id: number
  index: number
  lower_value: number | null
  upper_value: number | null
  reversed: boolean
}

// api/website
export type ModelWebsiteDataRequest = {
  website_id: number
}
/* ModelWebsitesDataItem -> api/menu */
/* ModelAttributesDataItem -> api/menu */


/* supabase関数のクエリ型を記述 */

// api/data/time-series
export type SelectTimeSeriesDataRequest = {
  sdate: string | null
  edate: string | null
  wid: number
  aid: number
}
export type SelectTimeSeriesDataItem = {
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
export type SelectTableDataRequest = {
  sdate: string | null
  edate: string | null
  wid: number
}
export type SelectTableDataItem = {
  attribute_name: string
  title: string
  avarage_value: number
}

// api/menu
export type SelectWebsitesDataItem = {
  website_id: number
  display_name: string
  index: number
  icon_url: string | null
}
export type SelectAttributesDataItem = {
  attribute_id: number
  display_name: string
  website_id: number
  index: number
  upper_value: number | null
  lower_value: number | null
}

// api/website
export type SelectWebsiteDataRequest = {
  website_id: number
}
/* SelectWebsitesDataItem -> api/menu */
/* SelectAttributesDataItem -> api/menu */


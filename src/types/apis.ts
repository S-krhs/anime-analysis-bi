// api/data/time-series
export type ParamsGetTimeSeriesData = {
  sdate: string
  edate: string
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
export type TimeSeriesDataItem = {
  date: string
  data: {
    title: string
    value: number
  }[]
}


// api/data/table
export type ParamsGetTableData = {
  sdate: string
  edate: string
  wid: number
}
export type SelectTableDataItem = {
  website_name: string
  attribute_name: string
  title: string
  avarage_value: number
}
export type TableDataItem = {
  title: string
  [key: string]: number | string
}

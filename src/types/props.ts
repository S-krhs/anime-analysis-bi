
export type MenuData = {
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
}[]
export type MenuDataProps = {
  menuData: MenuData
}

export type PropsTimeSeriesDataItem = {
  date: string
  data: {
    title: string
    value: number
  }[]
}
export type PropsTitlesArrayItem = {
  title: string
}

export type PropsTimeSeriesGraphProps = {
  timeSeriesData: PropsTimeSeriesDataItem[]
  titlesArray: PropsTitlesArrayItem[]
  attributeName: string
  startDate: string
  endDate: string
  upperScore: number
  lowerScore: number
}

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

'use client'

import TimeSeriesGraph, { GraphDataItem } from "@/components/graph/TimeSeriesGraph"
import CardWithTitle from "@/components/layout/CardWithTitle"
import DataTable from "@/components/table/DataTable"
import { TableDataItem, TimeSeriesDataItem } from "@/types/api"
import { AnalysisWebsiteAppProps } from "@/types/props"

const AnalysisWebsiteApp: React.FC<AnalysisWebsiteAppProps> = ({
  tableData,
  websiteData,
  timeSeriesData,
}: AnalysisWebsiteAppProps) => {

  const graphData: GraphDataItem[] = timeSeriesData.map((elem: TimeSeriesDataItem) => {
    return elem.data.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.title]: cur.value
      }
    }, { date: elem.date.split('-')[1] + '/' + elem.date.split('-')[2] })
  })

  // useStateにする
  const titlesArray: string[] = tableData.map((elem: TableDataItem) => elem.title)

  return (
    <>
      <section>
        <CardWithTitle title={'作品一覧'}>
          {/* <DataTable tableData={tableData}/> */}
        </CardWithTitle>
      </section>
      <section>
        <CardWithTitle title={websiteData.attributes[0].display_name}>
          <TimeSeriesGraph
            graphData={graphData}
            itemsArray={titlesArray}
            lowerValue={websiteData.attributes[0].lower_value}
            upperValue={websiteData.attributes[0].upper_value}
            reversed={websiteData.attributes[0].reversed ?? false}
            />
        </CardWithTitle>
      </section>
    </>
  )
}
export default AnalysisWebsiteApp

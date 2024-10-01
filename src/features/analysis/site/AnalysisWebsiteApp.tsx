'use client'

import TimeSeriesGraph, { GraphDataItem } from "@/components/graph/TimeSeriesGraph"
import CardWithTitle from "@/components/layout/CardWithTitle"
import SelectTable, { SelectTableDataItem } from "@/components/table/SelectTable"
import { AnalysisWebsiteAppProps, TimeSeriesDataItem } from "@/types/props"
import { useState } from "react"

const AnalysisWebsiteApp: React.FC<AnalysisWebsiteAppProps> = ({
  tableData,
  websiteData,
  timeSeriesDataList,
}: AnalysisWebsiteAppProps) => {
  const [filteredTitles, setFilteredTitles] = useState<string[]>([])
  const onFilteredData = (data: SelectTableDataItem[]) => {
    setFilteredTitles(
      data.filter(elem => elem.title)
      .map(elem => String(elem.title)))
  }

  // 時系列グラフの整形
  const graphDataList: GraphDataItem[][] = timeSeriesDataList.map((elem: TimeSeriesDataItem[]) => {
    return elem.map((elem2: TimeSeriesDataItem) => {
      return elem2.data.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.title]: cur.value
        }
      }, { date: elem2.date.split('-')[1] + '/' + elem2.date.split('-')[2] })
    })
  })

  // テーブルのカラムの整形
  const attributeNames = [
    { key: 'title', name: 'タイトル'},
    ...websiteData.attributes.map(elem => {
      return({
        key: elem.display_name,
        name: elem.display_name,
      })
    })
  ]

  return (
    <>
      <CardWithTitle title={'作品一覧'}>
        <SelectTable
          tableData={tableData}
          columnNames={attributeNames}
          initialCheckNumber={20}
          setFilteredData={onFilteredData}
          />
      </CardWithTitle>

      {websiteData.attributes.map((elem, index) => {
        return(
          <CardWithTitle title={websiteData.attributes[0].display_name} key={elem.attribute_id}>
            <TimeSeriesGraph
              graphData={graphDataList[index]}
              itemsArray={filteredTitles}
              lowerValue={elem.lower_value}
              upperValue={elem.upper_value}
              reversed={elem.reversed ?? false}
              />
          </CardWithTitle>
        )
      })}

    </>
  )
}
export default AnalysisWebsiteApp

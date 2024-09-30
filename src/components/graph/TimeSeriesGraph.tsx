'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { colorSet } from '@/constants/theme'
import { TimeSeriesDataItem, TimeSeriesGraphProps } from "@/types/props"
import { AxisDomain } from 'recharts/types/util/types'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'
import { useMediaQuery } from "@mui/material"
import { IS_PC_CONDITION } from '@/styles/media-query'

// 内部型定義
type GraphDataItem = {
  [key in string]: string | number
}

// ツールチップ
const CustomTooltip = ({ active, payload, label, reversed }: TooltipProps<number, string> & { reversed: boolean }): JSX.Element | null => {
  if (active && payload && payload.length) {
    const sortedPayload = payload.sort((a: Payload<number, string>, b: Payload<number, string>) => {
      return (reversed !== (a.value! > b.value!) ? -1 : 1)
    })
    return (
      <div className="bg-white p-4 rounded shadow-lg border border-primary-200">
        <p className="font-bold text-primary-600">{label}</p>
        {sortedPayload.map((entry, index) => (
          <div key={`item-${index}`} className='flex flex-row' style={{ color: entry.color }}>
            <p className='truncate max-w-60'>{entry.name}</p>
            <p>: {entry.value?.toLocaleString()}</p>
          </div>
        ))}
      </div>
    )
  }
  return null
}

/**
 * 時系列グラフ
 * @param timeSeriesData: TimeSeriesDataItem[] 時系列データ -> GraphDataItem[] グラフ用データに変換して利用
 * @param titlesArray: TitlesArrayItem[] 描画する作品のリスト
 * @param attributeName: string タイトルに表示する属性名
 * @param upperValue: number | null Y軸描画範囲の最大値
 * @param lowerValue: number | null Y軸描画範囲の最小値
 * @param reversed: boolean Y軸を降順にするかどうか
 * 
 * @returns 時系列グラフと要素名をまとめたカードコンポーネント
 */
const TimeSeriesGraph: React.FC<TimeSeriesGraphProps> = ({
  timeSeriesData,
  titlesArray,
  attributeName,
  upperValue,
  lowerValue,
  reversed,
}: TimeSeriesGraphProps) => {
  const graphData: GraphDataItem[] = timeSeriesData.map((elem: TimeSeriesDataItem) => {
    return elem.data.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.title]: cur.value
      }
    }, { date: elem.date.split('-')[1] + '/' + elem.date.split('-')[2] })
  })
  const domain: AxisDomain = [lowerValue ?? 'dataMin', upperValue ?? 'dataMax']
  const isPC: boolean = useMediaQuery(IS_PC_CONDITION)

  return (
    <Card className="mb-8 border-primary-200">
      <CardHeader className="border-b border-primary-100">
        <CardTitle className="text-primary-700">{attributeName}</CardTitle>
      </CardHeader>
      <CardContent className='px-2 lg:px-6'>
        <div className="mt-8 h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
              <XAxis dataKey="date" stroke="#000000" />
              {isPC ? <YAxis domain={domain} reversed={reversed} stroke="#000000" /> : <></>}
              <Tooltip wrapperStyle={{zIndex: 1}} content={<CustomTooltip reversed={reversed}/>} />
              {titlesArray.map((elem, index) => (
                <Line
                  key={elem.title}
                  type="linear"
                  dataKey={elem.title}
                  name={elem.title}
                  stroke={colorSet[index % colorSet.length]}
                  strokeWidth={1}
                  dot={{ r: 2 }}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 px-2 lg:px-0 flex flex-wrap gap-2">
          {titlesArray.map((elem, index) => (
            <div
              key={elem.title}
              className="flex items-center px-2 py-1 rounded-full text-sm text-white"
              style={{ backgroundColor: colorSet[index % colorSet.length] }}
            >
              {elem.title}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
export default TimeSeriesGraph

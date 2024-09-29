'use client'

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { colorSet } from '@/constants/theme'
import { TimeSeriesDataItem, TimeSeriesGraphProps } from "@/types/props";
import { AxisDomain } from 'recharts/types/util/types';
import { Payload } from 'recharts/types/component/DefaultTooltipContent'

// 型定義
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

// グラフ
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

  return (
    <Card className="mb-8 border-primary-200">
      <CardHeader className="border-b border-primary-100">
        <CardTitle className="text-primary-700">{attributeName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-8 h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
              <XAxis dataKey="date" stroke="#000000" />
              <YAxis
                domain={domain} reversed={reversed}
                className="hidden lg:block" stroke="#000000" />
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
        <div className="mt-4 flex flex-wrap gap-2">
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

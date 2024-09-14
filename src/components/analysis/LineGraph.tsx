'use client'

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Payload } from 'recharts/types/component/DefaultTooltipContent';
import { colorSet } from '@/constants/theme'

type TimeSeriesData = {
  date: string
  data: {
    title: string
    value: number
  }[]
}[]
type TitlesArray = {
  title: string
}[]
type Props = {
  timeSeriesData: TimeSeriesData
  titlesArray: TitlesArray
  attribute_name: string
  reverse?: boolean
}
type GraphData = {
  [key in string]: string | number
}[]

const compareFnDesc = (a: Payload<number, string>, b: Payload<number, string>) => {
if (a.value! > b.value!) {
    return -1
  } else if (a.value! === b.value!) {
    return 0
  } else {
    return 1
  }
}
const compareFnAsc = (a: Payload<number, string>, b: Payload<number, string>) => {
  if (a.value! < b.value!) {
      return -1
    } else if (a.value! === b.value!) {
      return 0
    } else {
      return 1
    }
}
const CustomTooltip = ({ active, payload, label, reverse = false }: TooltipProps<number, string> & { reverse?: boolean }): JSX.Element | null => {
  if (active && payload && payload.length) {
    const sortedPayload = reverse ? payload.sort(compareFnAsc) : payload.sort(compareFnDesc)
    return (
      <div className="bg-white p-4 rounded shadow-lg border border-primary-200">
        <p className="font-bold text-primary-600">{label}</p>
        {sortedPayload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}
const LineGraph: React.FC<Props> = ({ timeSeriesData, titlesArray, attribute_name, reverse = false }) => {
  const graphData: GraphData = timeSeriesData.map((elem) => {
    return elem.data.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.title]: cur.value
      }
    }, { date: elem.date.split('-')[1] + '/' + elem.date.split('-')[2] })
  })

  return (
    <Card className="mb-8 border-primary-200">
      <CardHeader className="border-b border-primary-100">
        <CardTitle className="text-primary-700">{attribute_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-8 h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
              <XAxis dataKey="date" stroke="#000000" />
              <YAxis className="hidden lg:block" stroke="#000000" reversed={reverse} />
              <Tooltip wrapperStyle={{zIndex: 1}} content={<CustomTooltip reverse={reverse} />} />
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
export default LineGraph

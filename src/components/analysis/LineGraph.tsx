'use client'

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  attribute: string
  attribute_name: string
}
type GraphData = {
  [key in string]: string | number
}[]

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>): JSX.Element | null => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded shadow-lg border border-primary-200">
        <p className="font-bold text-primary-600">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}
// todo
const colors = [
  '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316',
  '#6366F1', '#84CC16', '#06B6D4', '#D946EF', '#0EA5E9', '#F43F5E', '#22C55E', '#3B82F6',
  '#A855F7', '#64748B', '#CA8A04', '#0D9488', '#FF5C93', '#FFC107', '#8C9EFF', '#FF4081',
  '#CDDC39', '#00BCD4', '#7C4DFF', '#3F51B5', '#FF5722', '#795548', '#607D8B', '#00E676',
  '#F50057', '#9C27B0', '#FFC400', '#69F0AE', '#00BFA5', '#F06292', '#E91E63', '#009688',
  '#FFAB40', '#FF7043', '#1E88E5', '#3949AB', '#5E35B1', '#039BE5', '#43A047', '#7CB342',
  '#C0CA33', '#FFEB3B', '#A1887F', '#6D4C41'
]
const LineGraph: React.FC<Props> = ({ timeSeriesData, titlesArray, attribute, attribute_name }) => {
  const graphData: GraphData = timeSeriesData.map((elem) => {
    return elem.data.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.title]: cur.value
      }
    }, { date: elem.date })
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
              {/* <YAxis className="hidden lg:block" stroke="#000000" /> */}
              <Tooltip wrapperStyle={{zIndex: 1}} content={<CustomTooltip />} />
              {titlesArray.map((elem, index) => (
                <Line
                  key={elem.title}
                  type="linear"
                  dataKey={elem.title}
                  name={elem.title}
                  stroke={colors[index % colors.length]}
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
              style={{ backgroundColor: colors[index % colors.length] }}
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

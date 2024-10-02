'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import { colorSet } from '@/constants/theme'
import { AxisDomain } from 'recharts/types/util/types'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'
import { useMediaQuery } from "@mui/material"
import { IS_PC_CONDITION } from '@/styles/media-query'

// 型定義
export type GraphDataItem = {
  [key in string]: string | number
} & {
  date: string
}
export type TimeSeriesGraphProps = {
  graphData: GraphDataItem[]
  itemsArray: string[]
  lowerValue: number | null
  upperValue: number | null
  reversed: boolean
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
 * @param graphData: GraphDataItem[] グラフ用データ
 * @param itemsArray: string[] 描画対象のリスト
 * @param upperValue: number | null Y軸描画範囲の最大値
 * @param lowerValue: number | null Y軸描画範囲の最小値
 * @param reversed: boolean Y軸を降順にするかどうか
 * 
 * @returns 時系列グラフと要素名をまとめたカードコンポーネント
 */
const TimeSeriesGraph: React.FC<TimeSeriesGraphProps> = ({
  graphData,
  itemsArray,
  upperValue,
  lowerValue,
  reversed,
}: TimeSeriesGraphProps) => {

  const domain: AxisDomain = [lowerValue ?? 'dataMin', upperValue ?? 'dataMax']
  const isPC: boolean = useMediaQuery(IS_PC_CONDITION)

  return (
    <>
      <div className="mt-8 h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
            <XAxis dataKey="date" stroke="#000000" />
            <YAxis domain={domain} reversed={reversed} stroke="#000000" width={isPC ? 10 : 4} />
            <Tooltip wrapperStyle={{zIndex: 1}} content={<CustomTooltip reversed={reversed}/>} />
            {itemsArray.map((elem, index) => (
              <Line
                key={elem}
                type="linear"
                dataKey={elem}
                name={elem}
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
        {itemsArray.map((elem, index) => (
          <div
            key={elem}
            className="flex items-center px-2 py-1 rounded-full text-sm text-white"
            style={{ backgroundColor: colorSet[index % colorSet.length] }}
          >
            {elem}
          </div>
        ))}
      </div>
    </>
  )
}
export default TimeSeriesGraph

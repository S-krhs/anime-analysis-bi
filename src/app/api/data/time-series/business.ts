import { GetTimeSeriesData, GetTimeSeriesDataRequest } from "@/types/api"
import { ModelTimeSeriesDataItem, ModelTimeSeriesDataRequest } from "@/types/database"
import { getTimeSeriesData } from "./data"
import { ERROR_MESSAGE_URL } from "@/constants/api"
import { DEFAULT_EDATE, DEFAULT_SDATE } from "@/constants/database"

export const getTimeSeriesDataLogic = async (params: GetTimeSeriesDataRequest): Promise<GetTimeSeriesData> => {
  /*
    パラメータのバリデーション
    ———————————————*/
  if( !params.wid || !params.aid ){ throw(ERROR_MESSAGE_URL) }
  
  /*
    DBからデータの取得
    ———————————————*/
  const query: ModelTimeSeriesDataRequest = {
    sdate: params.sdate ?? DEFAULT_SDATE,
    edate: params.edate ?? DEFAULT_EDATE,
    wid: Number(params.wid),
    aid: Number(params.aid),
  }
  const data: ModelTimeSeriesDataItem[] = await getTimeSeriesData(query)

  /*
    データの整形
    ———————————————*/
  const timeSeriesData: GetTimeSeriesData = data.reduce((
    acc: GetTimeSeriesData,
    curr: ModelTimeSeriesDataItem
  ) => {
    const sameDateItem = acc.find(elem => elem.date === curr.date)
    if(!sameDateItem) {
      acc.push({
        date: curr.date,
        data: [{ title: curr.title, value: curr.value }]
      })
    } else if(!sameDateItem.data.find(elem => elem.title === curr.title)) {
      sameDateItem.data.push({ title: curr.title, value: curr.value })
    }
    return [...acc, ]
  }, []).sort((a, b) => a.date < b.date ? -1 : 1)
  // todo: 欠損日の補完

  return timeSeriesData
}
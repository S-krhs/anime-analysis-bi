import { GetTableData, GetTableDataRequest } from "@/types/api"
import { ModelTableDataItem, ModelTableDataRequest } from "@/types/database"
import { getTableData } from "./data"
import { ERROR_MESSAGE_URL } from "@/constants/api"

export const getTableDataLogic = async (params: GetTableDataRequest): Promise<GetTableData> => {
  /*
    パラメータのバリデーション
    ———————————————*/
  if(!params.wid){ throw(ERROR_MESSAGE_URL) }
  
  /*
    DBからデータの取得
    ———————————————*/
  const query: ModelTableDataRequest = {
    sdate: params.sdate,
    edate: params.edate,
    wid: Number(params.wid),
  }
  const data: ModelTableDataItem[] = await getTableData(query)

  /*
    データの整形
    ———————————————*/
  const tableData: GetTableData = data.reduce((acc: GetTableData, curr: ModelTableDataItem) => {
    const sameTitleItem = acc.find(elem => elem.title === curr.title)
    if(sameTitleItem){
      sameTitleItem[curr.display_name] = Number(curr.avarage_value.toFixed(1))
    }else{
      acc.push({
        title: curr.title,
        [curr.display_name]: Number(curr.avarage_value.toFixed(1))
      })
    }
    return acc
  }, [])

  const sortedTableData: GetTableData = (params.asc && params.attr)
    ? tableData
        .sort((a, b) => (params.asc !== (a[params.attr!] > b[params.attr!]) ? -1 : 1))
        .slice(0, params.limit)
    : tableData

  return sortedTableData
}
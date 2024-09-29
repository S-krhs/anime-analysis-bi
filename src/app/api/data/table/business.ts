import { GetTableData, GetTableDataRequest } from "@/types/api";
import { SelectTableDataItem, SelectTableDataRequest } from "@/types/database";
import { getTableData } from "./data";
import { ERROR_MESSAGE_URL } from "@/constants/api";

export const getTableDataLogic = async (params: GetTableDataRequest): Promise<GetTableData> => {
  /*
    パラメータのバリデーション
    ———————————————*/
  if(!params.wid){ throw(ERROR_MESSAGE_URL) }
  
  /*
    DBからデータの取得
    ———————————————*/
  const query: SelectTableDataRequest = {
    sdate: params.sdate,
    edate: params.edate,
    wid: Number(params.wid),
  }
  const data: SelectTableDataItem[] = await getTableData(query)

  /*
    データの整形
    ———————————————*/
  const tableData: GetTableData = data.reduce((acc: GetTableData, curr: SelectTableDataItem) => {
    const sameTitleItem = acc.find(elem => elem.title === curr.title)
    if(sameTitleItem){
      sameTitleItem[curr.attribute_name] = curr.avarage_value
    }else{
      acc.push({
        title: curr.title,
        [curr.attribute_name]: curr.avarage_value
      })
    }
    return acc
  }, [])

  return tableData
}
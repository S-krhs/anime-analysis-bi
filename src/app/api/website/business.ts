import { GetWebsiteData, GetWebsiteDataRequest } from "@/types/api"
import { ModelAttributesDataItem, ModelWebsiteDataRequest, ModelWebsitesDataItem } from "@/types/database"
import { getAttributesDataByWebsite, getWebsiteData } from "./data"
import { ERROR_MESSAGE_URL } from "@/constants/api"
import { defaultWebsiteIconUrl } from "@/constants/urls"

export const getWebsiteDataLogic = async (params: GetWebsiteDataRequest): Promise<GetWebsiteData> => {
  /*
    パラメータのバリデーション
    ———————————————*/
  if( !params.wid ){ throw(ERROR_MESSAGE_URL) }
  
  /*
    DBからデータの取得
    ———————————————*/
  const query: ModelWebsiteDataRequest = {
    website_id: Number(params.wid),
  }
  const data1: ModelWebsitesDataItem[] = await getWebsiteData(query)
  const data2: ModelAttributesDataItem[] = await getAttributesDataByWebsite(query)

  /*
    データの整形
    ———————————————*/
  const websiteData: GetWebsiteData = {
    ...data1[0],
    icon_url: data1[0].icon_url ?? defaultWebsiteIconUrl,
    attributes: data2
  }

  return websiteData
}
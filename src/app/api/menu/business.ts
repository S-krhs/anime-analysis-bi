import { GetMenuData } from "@/types/api"
import { ModelAttributesDataItem, ModelWebsitesDataItem } from "@/types/database"
import { getAttributesData, getWebsitesData } from "./data"
import { defaultWebsiteIconUrl } from "@/constants/urls"

export const getMenuDataLogic = async (): Promise<GetMenuData> => {
  /*
    DBからデータの取得
    ———————————————*/
  const data1: ModelWebsitesDataItem[] = await getWebsitesData()
  const data2: ModelAttributesDataItem[] = await getAttributesData()

  /*
    データの整形
    ———————————————*/
  const menuData: GetMenuData = data1.map((website: ModelWebsitesDataItem) => {
    const attributes = data2
      .filter((attribute: ModelAttributesDataItem) => attribute.website_id === website.website_id)
    return {
      ...website,
      icon_url: website.icon_url ?? defaultWebsiteIconUrl,
      attributes: attributes
    }
  }).filter(elem => elem.attributes.length)

  return menuData
}
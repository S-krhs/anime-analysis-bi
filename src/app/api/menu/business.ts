import { GetMenuData } from "@/types/api";
import { SelectAttributesDataItem, SelectWebsitesDataItem } from "@/types/database";
import { getAttributesData, getWebsitesData } from "./data";
import { defaultWebsiteIconUrl } from "@/constants/urls";

export const getMenuDataLogic = async (): Promise<GetMenuData> => {
  /*
    DBからデータの取得
    ———————————————*/
  const data1: SelectWebsitesDataItem[] = await getWebsitesData()
  const data2: SelectAttributesDataItem[] = await getAttributesData()

  /*
    データの整形
    ———————————————*/
  const menuData: GetMenuData = data1.map((website: SelectWebsitesDataItem) => {
    const attributes = data2
      .filter((attribute: SelectAttributesDataItem) => attribute.website_id === website.website_id)
    return {
      ...website,
      icon_url: website.icon_url ?? defaultWebsiteIconUrl,
      attributes: attributes
    }
  })

  return menuData
}
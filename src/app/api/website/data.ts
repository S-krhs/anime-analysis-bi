import { VIEW_ATTRIBUTES, VIEW_WEBSITES } from "@/constants/database"
import { supabaseClient } from "@/lib/supabase"
import { SelectWebsiteDataRequest, SelectWebsitesDataItem, SelectAttributesDataItem } from "@/types/database"

// ウェブサイト一覧
export const getWebsiteData = async (query: SelectWebsiteDataRequest): Promise<SelectWebsitesDataItem[]> => {
  const { data, error } = await supabaseClient
    .from(VIEW_WEBSITES)
    .select()
    .match(query)
  if(error){ throw(error) }

	return data
}

// データ属性一覧
export const getAttributesDataByWebsite = async (query: SelectWebsiteDataRequest): Promise<SelectAttributesDataItem[]> => {
  const { data, error } = await supabaseClient
    .from(VIEW_ATTRIBUTES)
    .select()
    .match(query)
  if(error){ throw(error) }

	return data
}


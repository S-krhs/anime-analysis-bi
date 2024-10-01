import { VIEW_ATTRIBUTES, VIEW_WEBSITES } from "@/constants/database"
import { supabaseClient } from "@/lib/supabase"
import { ModelWebsiteDataRequest, ModelWebsitesDataItem, ModelAttributesDataItem } from "@/types/database"

// ウェブサイト一覧
export const getWebsiteData = async (query: ModelWebsiteDataRequest): Promise<ModelWebsitesDataItem[]> => {
  const { data, error } = await supabaseClient
    .from(VIEW_WEBSITES)
    .select()
    .match(query)
  if(error){ throw(error) }

	return data
}

// データ属性一覧
export const getAttributesDataByWebsite = async (query: ModelWebsiteDataRequest): Promise<ModelAttributesDataItem[]> => {
  const { data, error } = await supabaseClient
    .from(VIEW_ATTRIBUTES)
    .select()
    .match(query)
  if(error){ throw(error) }

	return data
}


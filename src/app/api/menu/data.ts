import { VIEW_ATTRIBUTES, VIEW_WEBSITES } from "@/constants/database"
import { supabaseClient } from "@/lib/supabase"
import { ModelAttributesDataItem, ModelWebsitesDataItem } from "@/types/database"

// ウェブサイト一覧
export const getWebsitesData = async (): Promise<ModelWebsitesDataItem[]> => {
  const { data, error } = await supabaseClient
    .from(VIEW_WEBSITES)
    .select()
  if(error){ throw(error) }

	return data
}

// データ属性一覧
export const getAttributesData = async (): Promise<ModelAttributesDataItem[]> => {
  const { data, error } = await supabaseClient
    .from(VIEW_ATTRIBUTES)
    .select()
  if(error){ throw(error) }

	return data
}
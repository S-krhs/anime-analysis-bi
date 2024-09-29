import { VIEW_ATTRIBUTES, VIEW_WEBSITES } from "@/constants/database"
import { supabaseClient } from "@/lib/supabase"
import { SelectAttributesDataItem, SelectWebsitesDataItem } from "@/types/database"

// ウェブサイト一覧
export const getWebsitesData = async (): Promise<SelectWebsitesDataItem[]> => {
  const { data, error } = await supabaseClient
    .from(VIEW_WEBSITES)
    .select()
  if(error){ throw(error) }

	return data
}

// データ属性一覧
export const getAttributesData = async (): Promise<SelectAttributesDataItem[]> => {
  const { data, error } = await supabaseClient
    .from(VIEW_ATTRIBUTES)
    .select()
  if(error){ throw(error) }

	return data
}
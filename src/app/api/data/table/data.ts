import { FUNC_GET_TABLE_DATA } from "@/constants/database"
import { supabaseClient } from "@/lib/supabase"
import { ModelTableDataItem, ModelTableDataRequest } from "@/types/database"

// テーブルデータ
export const getTableData = async (query: ModelTableDataRequest): Promise<ModelTableDataItem[]> => {
	const { data, error } = await supabaseClient
	.rpc(FUNC_GET_TABLE_DATA, query)
	if(error){ throw(error) }

	return data
}

import { FUNC_GET_TABLE_DATA } from "@/constants/database"
import { supabaseClient } from "@/lib/supabase"
import { SelectTableDataItem, SelectTableDataRequest } from "@/types/database"

export const getTableData = async (query: SelectTableDataRequest): Promise<SelectTableDataItem[]> => {
	const { data, error } = await supabaseClient
	.rpc(FUNC_GET_TABLE_DATA, query)
	if(error){ throw(error) }

	return data
}

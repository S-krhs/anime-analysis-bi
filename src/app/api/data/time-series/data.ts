import { FUNC_GET_TIME_SERIES_DATA } from "@/constants/database"
import { supabaseClient } from "@/lib/supabase"
import { SelectTimeSeriesDataRequest, SelectTimeSeriesDataItem } from "@/types/database"

// 時系列データ
export const getTimeSeriesData = async (query: SelectTimeSeriesDataRequest): Promise<SelectTimeSeriesDataItem[]> => {
  const { data, error }  = await supabaseClient
    .rpc(FUNC_GET_TIME_SERIES_DATA, query)
  if(error){ throw(error) }

	return data
}


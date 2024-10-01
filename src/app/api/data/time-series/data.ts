import { FUNC_GET_TIME_SERIES_DATA } from "@/constants/database"
import { supabaseClient } from "@/lib/supabase"
import { ModelTimeSeriesDataRequest, ModelTimeSeriesDataItem } from "@/types/database"

// 時系列データ
export const getTimeSeriesData = async (query: ModelTimeSeriesDataRequest): Promise<ModelTimeSeriesDataItem[]> => {
  const { data, error }  = await supabaseClient
    .rpc(FUNC_GET_TIME_SERIES_DATA, query)
  if(error){ throw(error) }

	return data
}


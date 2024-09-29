import LineGraph from '@/components/analysis/LineGraph'
import { axiosClient } from '@/lib/axios'
import { apiTimeSeriesData, apiTableData } from '@/constants/urls'
import { GetTimeSeriesDataRequest, GetTimeSeriesData, GetTableData } from '@/types/api'

const AnalysisSiteApp: React.FC = async () => {
  const siteId = 1
  const params: GetTimeSeriesDataRequest = {
    sdate: '2024-01-01',
    edate: '2024-02-01',
    wid: String(1),
    aid: String(2),
  }
  const timeSeriesData: GetTimeSeriesData = await axiosClient.get(
    apiTimeSeriesData,
    { params: params }
  )

  const tableData: GetTableData = await axiosClient.get(apiTableData, {
    params: {
      sdate: '2024-01-01',
      edate: '2024-02-01',
      wid: 1,
    }
  })

  return (
    <>
      <section className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8">
        <div className="mb-4 flex justify-between items-center">
        </div>
        <LineGraph 
          timeSeriesData={timeSeriesData}
          titlesArray={tableData}
          attribute_name="hoge"
          reverse={true}
          />
      </section>
    </>
  )
}

export default AnalysisSiteApp
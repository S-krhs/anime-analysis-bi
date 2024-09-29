import LineGraph from '@/components/analysis/LineGraph'
import { axiosClient } from '@/lib/axios'
import { apiTimeSeriesData, apiTableData, apiWebsiteData } from '@/constants/urls'
import { GetTimeSeriesDataRequest, GetTimeSeriesData, GetTableData, GetWebsiteData, GetWebsiteDataRequest } from '@/types/api'
import { WebsiteData } from '@/types/props'

type AnalysisSiteAppProps = {
  params: {
    id: string
  }
}
const AnalysisSiteApp: React.FC<AnalysisSiteAppProps> = async ({ params }: AnalysisSiteAppProps) => {
  const wid = params.id

  const params1: GetWebsiteDataRequest = {
    wid: String(wid)
  }
  const websiteData: WebsiteData = await axiosClient.get(
    apiWebsiteData,
    { params: params1 }
  ) as GetWebsiteData

  const aid = websiteData.attributes[0].attribute_id
  const params2: GetTimeSeriesDataRequest = {
    sdate: '2024-01-01',
    edate: '2024-02-01',
    wid: String(wid),
    aid: String(aid),
  }
  const timeSeriesData: GetTimeSeriesData = await axiosClient.get(
    apiTimeSeriesData,
    { params: params2 }
  )

  const tableData: GetTableData = await axiosClient.get(apiTableData, {
    params: {
      sdate: '2024-01-01',
      edate: '2024-02-01',
      wid: String(wid),
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
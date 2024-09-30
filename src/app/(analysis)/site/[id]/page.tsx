import { axiosClient } from '@/lib/axios'
import { apiTimeSeriesData, apiTableData, apiWebsiteData } from '@/constants/urls'
import { GetTimeSeriesDataRequest, GetTimeSeriesData, GetTableData, GetWebsiteData, GetWebsiteDataRequest } from '@/types/api'
import { WebsiteData } from '@/types/props'
import TimeSeriesGraph from '@/components/graph/TimeSeriesGraph'
import { Suspense } from 'react'
import { getWebsiteDataLogic } from '@/app/api/website/business'
import DateRangePicker from '@/features/analysis/calender/DateRangePicker'

type AnalysisWebsitePageProps = {
  params: {
    id: string
  },
  searchParams: { [key: string]: string | undefined },
}
const AnalysisWebsitePage: React.FC<AnalysisWebsitePageProps> = async ({ params, searchParams }: AnalysisWebsitePageProps) => {
  return(
    <>
      <Suspense fallback={<div>Now loading...</div>}>
        <AnalysisWebsitePageContents
          params={params}
          searchParams={searchParams}
          />
      </Suspense>
    </>
  )
}
const AnalysisWebsitePageContents: React.FC<AnalysisWebsitePageProps> = async ({ params, searchParams }: AnalysisWebsitePageProps) => {
  const wid = params.id
  const params1: GetWebsiteDataRequest = {
    wid: String(wid)
  }
  const websiteData: WebsiteData = await getWebsiteDataLogic(params1) as GetWebsiteData

  const aid = websiteData.attributes[0].attribute_id
  const params2: GetTimeSeriesDataRequest = {
    sdate: searchParams['sdate'] ?? '2024-03-01',
    edate: searchParams['edate'] ?? '2024-04-01',
    wid: String(wid),
    aid: String(aid),
  }
  const timeSeriesData: GetTimeSeriesData = await axiosClient.get(
    apiTimeSeriesData,
    { params: params2 }
  )

  const tableData: GetTableData = await axiosClient.get(apiTableData, {
    params: {
      sdate: searchParams['sdate'] ?? '2024-03-01',
      edate: searchParams['edate'] ?? '2024-04-01',
      wid: String(wid),
    }
  })

  return (
    <>
      <div className='flex flex-col gap-4 px-4 lg:px-12 py-8'>
        <section>
          <h1 className='text-3xl'>{websiteData.display_name}</h1>
        </section>
        <section>
          <DateRangePicker />
        </section>
        <section>
          <TimeSeriesGraph 
            timeSeriesData={timeSeriesData}
            titlesArray={tableData}
            attributeName={websiteData.attributes[0].display_name}
            lowerValue={websiteData.attributes[0].lower_value}
            upperValue={websiteData.attributes[0].upper_value}
            reversed={websiteData.attributes[0].reversed ?? false}
            />
        </section>
      </div>
    </>
  )
}

export default AnalysisWebsitePage
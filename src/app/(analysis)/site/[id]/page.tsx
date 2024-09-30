import { GetTimeSeriesDataRequest, GetTimeSeriesData, GetTableData, GetWebsiteData, GetWebsiteDataRequest, GetTableDataRequest } from '@/types/api'
import { WebsiteData } from '@/types/props'
import { Suspense } from 'react'
import { getWebsiteDataLogic } from '@/app/api/website/business'
import { getTimeSeriesDataLogic } from '@/app/api/data/time-series/business'
import { getTableDataLogic } from '@/app/api/data/table/business'
import DateRangePicker from '@/features/analysis/site/DateRangePicker'
import AnalysisWebsiteApp from '@/features/analysis/site/AnalysisWebsiteApp'

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

// ContentをSuspenseのため切り出し
const AnalysisWebsitePageContents: React.FC<AnalysisWebsitePageProps> = async ({ params, searchParams }: AnalysisWebsitePageProps) => {
  const wid = params.id
  const params1: GetWebsiteDataRequest = {
    wid: String(wid)
  }
  const websiteData: WebsiteData = await getWebsiteDataLogic(params1) as GetWebsiteData

  return (
    <>
      <div className='flex flex-col gap-4 px-4 lg:px-12 py-8'>
        <section>
          <h1 className='text-3xl'>{websiteData.display_name}</h1>
        </section>
        <section>
          <DateRangePicker />
        </section>
        <Suspense key={JSON.stringify(searchParams)} fallback={<div>Now loading...</div>}>
          <AnalysisWebsitePageSearchResult
            params={params}
            searchParams={searchParams}
            websiteData={websiteData}
          />
        </Suspense>
      </div>
    </>
  )
}

// 日付範囲の検索結果
const AnalysisWebsitePageSearchResult: React.FC<AnalysisWebsitePageProps & { websiteData: WebsiteData }> = async ({
  params,
  searchParams,
  websiteData,
}: AnalysisWebsitePageProps & { websiteData: WebsiteData }) => {

  // 時系列データ
  const wid = params.id
  const aid = websiteData.attributes[0].attribute_id
  const params2: GetTimeSeriesDataRequest = {
    sdate: searchParams['sdate'] ?? '2024-03-01',
    edate: searchParams['edate'] ?? '2024-04-01',
    wid: String(wid),
    aid: String(aid),
  }
  const timeSeriesData: GetTimeSeriesData = await getTimeSeriesDataLogic(params2)

  // テーブルデータ
  const params3: GetTableDataRequest = {
    sdate: searchParams['sdate'] ?? '2024-03-01',
    edate: searchParams['edate'] ?? '2024-04-01',
    wid: String(wid),
  }
  const tableData: GetTableData = await getTableDataLogic(params3)

  return (
    <>
      <AnalysisWebsiteApp
        tableData={tableData}
        websiteData={websiteData}
        timeSeriesData={timeSeriesData}
        />
    </>
  )
}

export default AnalysisWebsitePage

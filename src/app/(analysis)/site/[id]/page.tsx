import { GetTimeSeriesDataRequest, GetTimeSeriesData, GetTableData, GetWebsiteData, GetWebsiteDataRequest, GetTableDataRequest } from '@/types/api'
import { TableDataItem, TimeSeriesDataItem, WebsiteData } from '@/types/props'
import { Suspense } from 'react'
import { getWebsiteDataLogic } from '@/app/api/website/business'
import { getTimeSeriesDataLogic } from '@/app/api/data/time-series/business'
import { getTableDataLogic } from '@/app/api/data/table/business'
import DateRangePicker from '@/features/analysis/site/DateRangePicker'
import AnalysisWebsiteApp from '@/features/analysis/site/AnalysisWebsiteApp'
import { Rampart_One } from 'next/font/google'

const rampartOne = Rampart_One({
  weight: '400',
  subsets: ['latin'],
})

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
      <div className='flex flex-col gap-4 lg:gap-8'>
        <section className='flex flex-col gap-4'>
          <div className='w-full h-24 lg:h-60 flex items-end relative'>
            <video className='absolute inset-0 w-full h-full object-cover object-center'
              src='https://www.sakugabooru.com/data/d1b9e6322e1d4ba11f9a1e4a2845b843.mp4' autoPlay loop muted playsInline />
            <div className='absolute inset-0 w-full h-full z-10 bg-black bg-opacity-40 '></div>
            <h1 className={`${rampartOne.className} text-4xl lg:text-8xl lg:font-bold text-white mx-2 -mb-1 z-10`}>{websiteData.display_name}</h1>
          </div>
          <div className='hidden lg:flex gap-20'>
            <div className='w-1/6'>
              <ul>
                <li>データ①: xxx人</li>
                <li>データ②: xxx層</li>
              </ul>
            </div>
            <div>
              <p>ここにサイトの説明</p>
            </div>
          </div>
        </section>
        <section>
          <DateRangePicker />
        </section>
        <section className='hidden lg:block'>
          <ul className='flex h-24 justify-around'>
            <li className='w-1/6 h-full'>
              <a className='relative w-full h-full block'
                href='https://video.twimg.com/ext_tw_video/1760172761300008960/pu/vid/avc1/640x360/oiE2GLnJmoD92HK0.mp4' target='_blank'>
                <img className='absolute inset-0 max-w-full max-h-full'
                  src='https://vtg5u9fph9z65gds.public.blob.vercel-storage.com/other/anime/capture/btr-0FM4hZEP2OR0ZcOdatng9KAK1tNmRO.png'/>
              </a>
            </li>
            <li className='w-1/6 h-full'>
              <a className='relative w-full h-full block'
                href='https://www.sakugabooru.com/data/5e2385acbf932f88bb458e7cc22ea113.mp4' target='_blank'>
                <img className='absolute inset-0 max-w-full max-h-full'
                  src='https://vtg5u9fph9z65gds.public.blob.vercel-storage.com/other/anime/capture/geass-SiWhCwCL9qoMaf6ziR1AYJaF8CzUIO.png'/>
              </a>
            </li>
            <li className='w-1/6 h-full'>
              <a className='relative w-full h-full block'
                href='https://www.sakugabooru.com/data/5f8d73e90c846679ece6fe867cccbe49.mp4' target='_blank'>
                <img className='absolute inset-0 max-w-full max-h-full'
                  src='https://vtg5u9fph9z65gds.public.blob.vercel-storage.com/other/anime/capture/liz-5rTm425vDoIcrQMF1xUa3SBSlUqFX3.png'/>
              </a>
            </li>
            <li className='w-1/6 h-full'>
              <a className='relative w-full h-full block'
                href='https://video.twimg.com/ext_tw_video/1760172761300008960/pu/vid/avc1/640x360/oiE2GLnJmoD92HK0.mp4' target='_blank'>
                <img className='absolute inset-0 max-w-full max-h-full'
                  src='https://vtg5u9fph9z65gds.public.blob.vercel-storage.com/other/anime/capture/btr-0FM4hZEP2OR0ZcOdatng9KAK1tNmRO.png'/>
              </a>
            </li>
            <li className='w-1/6 h-full'>
              <a className='relative w-full h-full block'
                href='https://www.sakugabooru.com/data/5e2385acbf932f88bb458e7cc22ea113.mp4' target='_blank'>
                <img className='absolute inset-0 max-w-full max-h-full'
                  src='https://vtg5u9fph9z65gds.public.blob.vercel-storage.com/other/anime/capture/geass-SiWhCwCL9qoMaf6ziR1AYJaF8CzUIO.png'/>
              </a>
            </li>
          </ul>
        </section>
        <section>
          <Suspense key={JSON.stringify(searchParams)} fallback={<div>Now loading...</div>}>
            <AnalysisWebsitePageSearchResult
              params={params}
              searchParams={searchParams}
              websiteData={websiteData}
            />
          </Suspense>
        </section>
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
  const wid = params.id

  // 時系列データ
  const timeSeriesParamsArray
  : GetTimeSeriesDataRequest[] = websiteData.attributes.map((elem) => {
    return({
      sdate: searchParams['sdate'] ?? '2024-04-01',
      edate: searchParams['edate'] ?? '2024-06-30',
      wid: String(wid),
      aid: String(elem.attribute_id),
    })
  })
  const timeSeriesDataList: TimeSeriesDataItem[][] = await Promise.all(
    timeSeriesParamsArray.map(async (elem: GetTimeSeriesDataRequest) => {
      return await getTimeSeriesDataLogic(elem)
    })
  )
  

  // テーブルデータ
  const primaryAtributeName = websiteData.attributes[0].display_name
  const primaryAtributeReversed = websiteData.attributes[0].reversed
  const getTableDataParams: GetTableDataRequest = {
    sdate: searchParams['sdate'] ?? '2024-04-01',
    edate: searchParams['edate'] ?? '2024-06-30',
    wid: String(wid),
    attr: primaryAtributeName,
    asc: primaryAtributeReversed,
  }
  const tableData: TableDataItem[] = (await getTableDataLogic(getTableDataParams))

  return (
    <>
      <AnalysisWebsiteApp
        tableData={tableData}
        websiteData={websiteData}
        timeSeriesDataList={timeSeriesDataList}
        />
    </>
  )
} 

export default AnalysisWebsitePage

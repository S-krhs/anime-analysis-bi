import LineGraph from '@/components/analysis/LineGraph'
import { axiosClient } from '@/lib/axios'
import { apiPathTimeSeriesData, apiPathTableData } from '@/constants/urls'


const AnalysisSiteApp: React.FC = async () => {
  const timeSeriesDataResponse = await axiosClient.get(apiPathTimeSeriesData, {
    params: {
      sdate: '2024-01-01',
      edate: '2024-02-01',
      wid: 1,
      aid: 2,
    }
  })
  const timeSeriesData = timeSeriesDataResponse.data

  const tableData = await axiosClient.get(apiPathTableData, {
    params: {
      sdate: '2024-01-01',
      edate: '2024-02-01',
      wid: 1,
    }
  }).then(res => res.data)

  return (
    <>
      <section className="flex-1 overflow-auto p-4 lg:p-8">
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
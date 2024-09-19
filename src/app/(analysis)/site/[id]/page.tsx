import LineGraph from '@/components/analysis/LineGraph'
import { axiosClient } from '@/lib/axios'
import { apiPathTimeData } from '@/constants/urls'

const AnalysisSiteApp: React.FC = async () => {
  const response = await axiosClient.get(apiPathTimeData)
  // console.info('Response: ', response)

  const data = response.data
  return (
    <>
      <section className="flex-1 overflow-auto p-4 lg:p-8">
        <div className="mb-4 flex justify-between items-center">
        </div>
        <LineGraph 
          timeSeriesData={data.timeSeriesData}
          titlesArray={data.titlesData}
          attribute_name="hoge"
          reverse={true}
          />
      </section>
    </>
  )
}

export default AnalysisSiteApp
import "@/styles/globals.css"
import { SideMenuPc, SideMenuSp } from '@/components/base/SideMenu'

const AnalysisLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  // todo -> supabase
  const url = process.env.BASE_URL + '/mock/api/site-list'
  const websiteList = await fetch(url)
    .then(res => res.json())

  return (
    <div className="flex flex-col h-screen bg-primary-50">
      <header className="bg-white shadow-sm px-4 py-2 border-b border-primary-100 hidden lg:block">
        <h1 className="text-2xl font-bold text-primary-700">アニメ視聴データ分析</h1>
        {/* <p className="mt-2 text-primary-600">アニメの視聴データを分析し、トレンドを把握しましょう。</p> */}
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="lg:hidden">
          <SideMenuSp websiteList={websiteList} />
        </div>
        <div className="hidden lg:block">
          <SideMenuPc websiteList={websiteList} />
        </div>
        {children}
      </div>
    </div>
  )
}
export default AnalysisLayout

import "@/styles/globals.css"
import { Suspense } from "react"
import SideMenuApp from "./_common/side-menu"


/**
 * @todo NowLoading
 */ 
const AnalysisLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <SideMenuApp />
        <Suspense fallback={<div>Now loading...</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  )
}
export default AnalysisLayout

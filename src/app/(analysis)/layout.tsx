import "@/styles/globals.css"
import { Suspense } from "react"
import SideMenuApp from "./_common/side-menu"
import EnvironmentBadge from "@/components/base/EnvironmentBadge"


/**
 * @todo NowLoading
 */ 
const AnalysisLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <main className="flex overflow-hidden h-screen">
        <nav><SideMenuApp /></nav>
        <article className="flex-1 overflow-y-auto">{children}</article>
      </main>
      <EnvironmentBadge />
    </>
  )
}
export default AnalysisLayout

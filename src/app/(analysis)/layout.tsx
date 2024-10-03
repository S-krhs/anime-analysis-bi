import "@/styles/globals.css"
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
    <>
      <main className="flex overflow-hidden h-screen">
        <nav><SideMenuApp /></nav>
        <article className="flex-1 overflow-y-auto">{children}</article>
      </main>
    </>
  )
}
export default AnalysisLayout

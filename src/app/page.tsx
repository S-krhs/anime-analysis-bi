import Link from "next/link"

const RootApp: React.FC = () => {
  return (
    <>
      <h1>とっぷぺーじ</h1>
      <Link href="/site/1">
        入り口
      </Link>
    </>
  )
}

export default RootApp;
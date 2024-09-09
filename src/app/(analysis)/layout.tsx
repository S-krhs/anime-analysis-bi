import "@/styles/globals.css"
import { SideMenuPc, SideMenuSp } from '@/components/base/SideMenu'

const list = [
  {
    "website_id": 1,
    "website_name": "9anime",
    "icon_url": "http://localhost:3000/mock/img/9anime.png",
    "attributes": [
      {
        "attribute_id": 1,
        "attribute_name": "favorites"
      },
      {
        "attribute_id": 2,
        "attribute_name": "users"
      },
      {
        "attribute_id": 3,
        "attribute_name": "nya-n"
      }
    ]
  },
  {
    "website_id": 6,
    "website_name": "danime",
    "icon_url": "http://localhost:3000/mock/img/danime.png",
    "attributes": [
      {
        "attribute_id": 1,
        "attribute_name": "favorites"
      },
      {
        "attribute_id": 2,
        "attribute_name": "users"
      }
    ]
  },
  {
    "website_id": 3,
    "website_name": "AmazonPrimeVideoJPTV",
    "icon_url": "http://localhost:3000/mock/img/amazon-tv.png",
    "attributes": [
      {
        "attribute_id": 1,
        "attribute_name": "favorites"
      },
      {
        "attribute_id": 2,
        "attribute_name": "users"
      }
    ]
  },
  {
    "website_id": 10,
    "website_name": "dummy",
    "icon_url": "http://localhost:3000/mock/img/amazon-tv.png",
    "attributes": [
      {
        "attribute_id": 1,
        "attribute_name": "favorites"
      },
      {
        "attribute_id": 2,
        "attribute_name": "users"
      }
    ]
  },
  {
    "website_id": 11,
    "website_name": "dummy",
    "icon_url": "http://localhost:3000/mock/img/amazon-tv.png",
    "attributes": [
      {
        "attribute_id": 1,
        "attribute_name": "favorites"
      },
      {
        "attribute_id": 2,
        "attribute_name": "users"
      }
    ]
  },
  {
    "website_id": 12,
    "website_name": "dummy",
    "icon_url": "http://localhost:3000/mock/img/amazon-tv.png",
    "attributes": [
      {
        "attribute_id": 1,
        "attribute_name": "favorites"
      },
      {
        "attribute_id": 2,
        "attribute_name": "users"
      }
    ]
  },
  {
    "website_id": 13,
    "website_name": "dummy",
    "icon_url": "http://localhost:3000/mock/img/amazon-tv.png",
    "attributes": [
      {
        "attribute_id": 1,
        "attribute_name": "favorites"
      },
      {
        "attribute_id": 2,
        "attribute_name": "users"
      }
    ]
  },
  {
    "website_id": 14,
    "website_name": "dummy",
    "icon_url": "http://localhost:3000/mock/img/amazon-tv.png",
    "attributes": [
      {
        "attribute_id": 1,
        "attribute_name": "favorites"
      },
      {
        "attribute_id": 2,
        "attribute_name": "users"
      }
    ]
  }
]

const AnalysisLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  // todo -> supabase
  const url = process.env.BASE_URL + '/mock/api/site-list'
  const websiteList = list

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

import "@/styles/globals.css"
import { SideMenuPc, SideMenuSp } from '@/components/base/SideMenu'
import { Suspense } from "react"

const list = [
  {
    "website_id": 1,
    "website_name": "9anime",
    "icon_url": "https://d1uuvxx0lewft6.cloudfront.net/img/9anime.png",
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
    "website_name": "dアニメストア",
    "icon_url": "https://d1uuvxx0lewft6.cloudfront.net/img/danime.png",
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
    "website_name": "AmazonPrimeVideo",
    "icon_url": "https://d1uuvxx0lewft6.cloudfront.net/img/amazon-tv.png",
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
    "icon_url": "https://d1uuvxx0lewft6.cloudfront.net/img/amazon-tv.png",
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
    "icon_url": "https://d1uuvxx0lewft6.cloudfront.net/img/amazon-tv.png",
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
    "icon_url": "https://d1uuvxx0lewft6.cloudfront.net/img/amazon-tv.png",
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
    "icon_url": "https://d1uuvxx0lewft6.cloudfront.net/img/amazon-tv.png",
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
    "icon_url": "https://d1uuvxx0lewft6.cloudfront.net/img/amazon-tv.png",
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
  const websiteList = list

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <div className="lg:hidden">
          <SideMenuSp websiteList={websiteList} />
        </div>
        <div className="hidden lg:block">
          <SideMenuPc websiteList={websiteList} />
        </div>
        <Suspense fallback={<div>Now loading...</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  )
}
export default AnalysisLayout

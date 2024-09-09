"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger　} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'


type Attribute = {
  attribute_id: number
  attribute_name: string
}
type WebsiteItem = {
  website_id: number
  website_name: string
  icon_url: string
  attributes: Attribute[]
}
type Props = {
  pageId?: number
  websiteList: WebsiteItem[]
}

const _MenuContentFull: React.FC<Props> = ({ websiteList, pageId = undefined }) => {
  return (
    <div className="px-4 py-6">
      <ul>
        {websiteList && websiteList.map((website) => (
          <li className="mb-2" key={website.website_id}>
            <Button
              variant="ghost"
              className="w-full h-full justify-start text-primary-600 p-0"
              tabIndex={-1}
            >
              <Link
                href={`/site/${ website.website_id }`}
                className="flex w-full h-full p-2">
                <img src={website.icon_url} className="mr-2 h-6 w-6 caret-transparent" alt="logo" />
                <p className="caret-transparent">{website.website_name}</p>
              </Link>
            </Button>
            {<ul className={`overflow-hidden mt-1 mb-4
              ${ pageId && website.website_id === pageId ? '' : 'hidden' }`}>
              {website.attributes.map(attribute => (
                <li key={attribute.attribute_id} className="mb-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 justify-start hover:bg-primary-100 caret-transparent mx-8"
                  >
                    <p className="text-sm caret-transparent">{attribute.attribute_name}</p>
                  </Button>
                </li>
              ))}
            </ul>}
          </li>
        ))}
      </ul>
    </div>
  )
}
const _MenuContentBar: React.FC<Props> = ({ websiteList }) => {
  return (
    <div className="my-2">
      <ul>
        {websiteList.map((website) => (
          <li className="w-9 h-9 mb-2" key={website.website_id}>
            <Button
              variant="ghost"
              className="w-full flex justify-center text-primary-600"
              size="icon"
              tabIndex={-1}
            >
              <Link
                href={`/site/${ website.website_id }`}
                className="flex w-full h-full">
                <img src={website.icon_url} className="m-auto h-6 w-6" alt="logo" />
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const SideMenuPc: React.FC<Props> = ({ websiteList }) => {
  const params = useParams()
  return (
    <div className="w-64 h-full overflow-y-auto">
      <_MenuContentFull websiteList={websiteList} pageId={Number(params.id)} />
    </div>
  )
}
export const SideMenuSp: React.FC<Props> = ({ websiteList }) => {
  return (
    <div className="relative">
      <Sheet>
        <div>
          <SheetTrigger>
              <Button variant="ghost" size="icon" tabIndex={-1}>
                <Menu />
              </Button>
          </SheetTrigger>
          <_MenuContentBar websiteList={websiteList} />
        </div>
        <SheetContent side="left" className="px-0">
          <SheetHeader>
          <SheetTitle>メニュー</SheetTitle>
            <SheetDescription>取得サイト一覧</SheetDescription>
          </SheetHeader>
          <_MenuContentFull websiteList={websiteList} />
        </SheetContent>
      </Sheet>
    </div>
  )
}

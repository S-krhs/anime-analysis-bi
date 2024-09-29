import { getMenuDataLogic } from "@/app/api/menu/business"
import { SideMenuPC, SideMenuSP } from "@/features/menu/SideMenu"
import { apiMenuData } from "@/constants/urls"
import { axiosClient } from "@/lib/axios"
import { GetMenuData } from "@/types/api"
import { MenuData } from "@/types/props"


/**
 * @returns RSC サイドメニューバー
 */ 
const SideMenuApp : React.FC = async () => {
  /*
    データの取得
    ———————————————*/
  // const menuData: MenuData = await axiosClient.get(apiMenuData) as GetMenuData
  const menuData: MenuData = await getMenuDataLogic() as GetMenuData

  /*
    CCを返す
    ———————————————*/
  return (
    <>
      <div className="lg:hidden">
        <SideMenuSP menuData={menuData} />
      </div>
      <div className="hidden lg:block">
        <SideMenuPC menuData={menuData} />
      </div>
    </>
  )
}
export default SideMenuApp
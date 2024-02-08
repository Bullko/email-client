"use client"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import User from "@/components/User"
import { Separator } from "./ui/separator"
import Menu from "@/components/Menu"
import MailsFilter from "@/components/MailsFilter"
import { useContext, useEffect, useState } from "react"
import UserContext from "./UserProvider"
import MailList from "@/components/MailList"
import MailDetail from "./MailDetail"
import ContactDetail from "./ContactDetail"
import ContactsNames from "./ContactsNames"
import StarredList from "./StaredList"

function Header() {
  const { active, setActive, selectedMail } = useContext(UserContext);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

  const formatActiveText = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full border rounded-lg "
    >
      <ResizablePanel
      defaultSize={20} 
      collapsedSize={4} // Toto je veľkosť, na ktorú sa panel "zasekne"
      collapsible={true}
      minSize={4} // Toto je najmenšia možná veľkosť panelu
      maxSize={20}
      onCollapse={((collapsed: boolean, panelIndex: number) => {
        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(collapsed)}`;
      }) as any}
      className="min-w-[50px] transition-all duration-300 ease-in-out"
      >
        <div className="h-[50px] p-2">
          <User />
        </div>
        <Separator className="w-full mt-2 mb-2" />
        <Menu />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40} minSize={20} className="h-screen min-h-[800px]">
        <div className="h-[50px] p-2 flex justify-between justify-items-center items-center align-middle w-full">
          <h1 className="text-2xl font-bold">{formatActiveText(active)}</h1>
        </div>
        <Separator className="w-full mt-2" />
        <div className="h-full overflow-y-scroll scrollbar-hide">
        {isSmallScreen ? 
  (selectedMail ? <MailDetail /> : (active === "inbox" ? <MailList /> : active === "contacts" ? <ContactsNames /> : active === "starred" ? <StarredList /> : ""))
  :
  (active === "inbox" ? <MailList /> : active === "contacts" ? <ContactsNames /> : active === "starred" ? <StarredList /> : "")
}
        </div>
      </ResizablePanel>
      {!isSmallScreen && (
  <>
    <ResizableHandle withHandle />
    <ResizablePanel defaultSize={40}>
    {active === "inbox" ? <MailDetail /> : active === "contacts" ? <ContactDetail /> : active === "starred" ? <MailDetail /> : ""}
    </ResizablePanel>
  </>
)}
    </ResizablePanelGroup>
  )
}

export default Header
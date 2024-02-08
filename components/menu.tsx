import React, { useContext, useEffect, useRef, useState } from 'react'
import { Separator } from './ui/separator'
import {
    InboxIcon,
    DocumentIcon,
    PaperAirplaneIcon,
    ArchiveBoxXMarkIcon,
    TrashIcon,
    ArchiveBoxIcon,
    UserGroupIcon,
    ExclamationCircleIcon,
    ChatBubbleLeftRightIcon,
    ShoppingCartIcon,
    TagIcon,
    StarIcon
} from '@heroicons/react/24/solid'

import UserContext from './UserProvider';

const menu = () => {

    const { active, setActive, mails } = useContext(UserContext)
    const [isCollapsed, setIsCollapsed] = useState<boolean | null>(null);
    const menuRef = useRef(null)
    useEffect(()=>{
        if (menuRef.current) {
            const resizeObserver = new ResizeObserver(entries => {
              for (let entry of entries) {
                setIsCollapsed(entry.contentRect.width < 170);
              }
            });
      
            resizeObserver.observe(menuRef.current);
      
            return () => {
              resizeObserver.disconnect();
            };
          }
    }, [menuRef.current])

    return (
        <nav className='pl-2 pr-2' ref={menuRef}>
            <ul className='mt-2'>
                <li className={`flex items-center ${isCollapsed? "justify-center" : "justify-between"} p-2 ${active === 'inbox' ? 'active-li' : ''}`}
                    onClick={() => setActive("inbox")}
                ><div className='flex items-center'>
                        <InboxIcon className="w-5 h-5 " />
                        {isCollapsed ? "" : <a className="ml-2 text-s">Inbox</a>}
                    </div>
                    {isCollapsed ? "" : <p className='pr-2'>{mails.length}</p>}
                </li>
                <li className={`flex items-center  ${isCollapsed? "justify-center" : "justify-between"} p-2 ${active === 'starred' ? 'active-li' : ''}`}
                    onClick={() => setActive("starred")}
                ><div className='flex items-center'>
                        <StarIcon className="w-5 h-5" />
                        {isCollapsed ? "" : <a className='ml-2 text-s'>Starred</a>}
                    </div>
                    
                </li>
                <li className={`flex items-center ${isCollapsed? "justify-center" : "justify-between"} p-2 ${active === 'draft' ? 'active-li' : ''}`}
                    onClick={() => setActive("draft")}
                >
                    <div className='flex items-center'>
                        <DocumentIcon className="w-5 h-5" />
                        {isCollapsed ? "" : <a className='ml-2 text-s'>Drafts</a>}
                    </div>
                </li>
                <li className={`flex items-center ${isCollapsed? "justify-center" : "justify-between"} p-2 ${active === 'sent' ? 'active-li' : ''}`}
                    onClick={() => setActive("sent")}>
                    <div className='flex items-center'>
                        <PaperAirplaneIcon className="w-5 h-5" />
                        {isCollapsed ? "" : <a className='ml-2 text-s'>Sent</a>}
                    </div>
                </li>
                <li className={`flex items-center ${isCollapsed? "justify-center" : "justify-between"} p-2 ${active === 'junk' ? 'active-li' : ''}`}
                    onClick={() => setActive("junk")}>
                    <div className='flex items-center'>
                        <ArchiveBoxXMarkIcon className="w-5 h-5" />
                        {isCollapsed ? "" : <a className='ml-2 text-s'>Junk</a>}
                    </div>
                </li>
                <li className={`flex items-center ${isCollapsed? "justify-center" : "justify-between"} p-2 ${active === 'trash' ? 'active-li' : ''}`}
                    onClick={() => setActive("trash")}>
                    <div className='flex items-center'>
                        <TrashIcon className="w-5 h-5" />
                        {isCollapsed ? "" : <a className='ml-2 text-s'>Trash</a>}
                    </div>
                </li>
                <li className={`flex items-center ${isCollapsed? "justify-center" : "justify-between"} p-2 ${active === 'archives' ? 'active-li' : ''}`}
                    onClick={() => setActive("archives")}>
                    <div className='flex items-center'>
                        <ArchiveBoxIcon className="w-5 h-5" />
                        {isCollapsed ? "" : <a className='ml-2 text-s'>Archives</a>}
                    </div>
                </li>
                <Separator className='my-2' />
                <li className={`flex items-center ${isCollapsed? "justify-center" : "justify-between"} p-2 ${active === 'contacts' ? 'active-li' : ''}`}
                    onClick={() => setActive("contacts")}>
                    <div className='flex items-center'>
                        <UserGroupIcon className="w-5 h-5" />
                        {isCollapsed ? "" : <a className='ml-2 text-s'>Contacts</a>}
                    </div>
                </li>
                <li className={`flex items-center ${isCollapsed? "justify-center" : "justify-between"} p-2 ${active === 'updates' ? 'active-li' : ''}`}
                    onClick={() => setActive("updates")}>
                    <div className='flex items-center'>
                        <ExclamationCircleIcon className="w-5 h-5" />
                        {isCollapsed ? "" : <a className='ml-2 text-s'>Updates</a>}
                    </div>
                </li>
                <li className={`flex items-center ${isCollapsed? "justify-center" : "justify-between"} p-2 ${active === 'forums' ? 'active-li' : ''}`}
                    onClick={() => setActive("forums")}>
                    <div className='flex items-center'>
                        <ChatBubbleLeftRightIcon className="w-5 h-5" />
                        {isCollapsed ? "" : <a className='ml-2 text-s'>Forums</a>}
                    </div>
                </li>
                <li className={`flex items-center ${isCollapsed? "justify-center" : "justify-between"} p-2 ${active === 'shopping' ? 'active-li' : ''}`}
                    onClick={() => setActive("shopping")}>
                    <div className='flex items-center'>
                        <ShoppingCartIcon className="w-5 h-5" />
                        {isCollapsed ? "" : <a className='ml-2 text-s'>Shopping</a>}
                    </div>
                </li>
                <li className={`flex items-center ${isCollapsed? "justify-center" : "justify-between"} p-2 ${active === 'promotions' ? 'active-li' : ''}`}
                    onClick={() => setActive("promotions")}>
                    <div className='flex items-center'>
                        <TagIcon className="w-5 h-5 mr-2" />
                        {isCollapsed ? "" : <a className='ml-2 text-s'>Promotions</a>}
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default menu
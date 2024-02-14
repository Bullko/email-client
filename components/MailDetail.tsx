import React, { useContext } from 'react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import {
    ArchiveBoxIcon,
    ArchiveBoxXMarkIcon,
    TrashIcon,
    ArrowUturnLeftIcon,
    ArrowUturnRightIcon,
    ChevronLeftIcon,
    EllipsisVerticalIcon,
    PaperClipIcon,
} from '@heroicons/react/24/outline'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import UserContext from './UserProvider'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


interface MailDetailProps {
  // other props...
}

function MailDetail({ ...otherProps }: MailDetailProps) {
    const {selectedMail, setSelectedMail,} = useContext(UserContext)



    const handleStarClick = () => {
      if (selectedMail) {
        // Toggle the star status
        const updatedMail = {
          ...selectedMail,
          star: !selectedMail.star
        };
        setSelectedMail(updatedMail);
    
        // Get the existing starred mails from localStorage
        const starredMails = JSON.parse(localStorage.getItem('starredMails') || '[]');
      
        // Check if the mail is already starred
        const mailIndex = starredMails.indexOf(selectedMail.id);
        if (mailIndex === -1) {
          // Mail is not starred, add it to the array
          starredMails.push(selectedMail.id);
        } else {
          // Mail is already starred, remove it from the array
          starredMails.splice(mailIndex, 1);
        }
      
        // Save the updated array back to localStorage
        localStorage.setItem('starredMails', JSON.stringify(starredMails));
      }
    }


if (!selectedMail) {
    return <div className='flex items-center justify-center w-full h-full '>📨 Select mail for details</div>
}

  return (
    <div className='flex flex-col w-full h-full'>
    <div className="h-[50px] p-2 flex justify-between justify-items-center items-center align-middle w-full">
        <div className='flex'>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="ghost">
                      <ArchiveBoxIcon className="w-4 h-4"/>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className='text-xs'>Archive</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="ghost">
                      <ArchiveBoxXMarkIcon className="w-4 h-4"/>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className='text-xs'>Move to junk</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                  <Button variant="ghost">
                    <TrashIcon className="w-4 h-4"/>
                  </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className='text-xs'>Move to trash</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
        </div>
        <div className='flex'>
            <Button variant="ghost"><ArrowUturnLeftIcon className="w-4 h-4"/></Button>
            <Button variant="ghost" className='relative items-center justify-center'><ArrowUturnLeftIcon className="w-4 h-4"/><ChevronLeftIcon className="h-4 w-4 absolute left-1.5 top-2.5"/></Button>
            <Button variant="ghost"><ArrowUturnRightIcon className="w-4 h-4"/></Button>
            <Separator orientation='vertical' className='h-10 mx-2'/>
            <Popover>
                <PopoverTrigger>
                  <EllipsisVerticalIcon className="w-4 h-4"/>
                </PopoverTrigger>
                <PopoverContent className='flex flex-col w-auto mr-4' >
                    <div className='rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800'><p className='p-4 text-xs'>Mark as unread</p></div>
                    <div className='flex flex-row rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800'><p className='p-4 text-xs' onClick={handleStarClick}>{selectedMail.star === true ? "Unstar" : "Star"} Thread</p></div>
                    <div className='rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800'><p className='p-4 text-xs'>Mute thread</p></div>
                </PopoverContent>
            </Popover>
        </div>
      </div>
      <Separator className="w-full mt-2"/>
      <div className='flex justify-between p-4'>
        <div className='flex items-center'>
          <Avatar className="mr-2">
            <AvatarImage src="" />
            <AvatarFallback className='text-white bg-purple-500'>{selectedMail.name.split(" ").map(word=> word[0]).join("")}</AvatarFallback>
          </Avatar>
      <div>
        <h3 className='font-bold text-md'>{selectedMail.name}</h3>
        <p className='text-xs'>{selectedMail.subject}</p>
        <p className='text-xs'>Reply-To: {selectedMail.email}</p>
      </div>
        </div>
      <div className='flex flex-col place-items-end'>
        <p className='text-xs text-gray-400'>{selectedMail.date.slice(0,10)}</p>
        <p className='text-xs text-gray-400'>{selectedMail.date.slice(11, 16)}</p>
      </div>
      </div>
      <Separator />
      <div className='flex-grow p-4 overflow-auto text-sm'>
        {selectedMail.text}
      </div>
      <Separator />
      <div className='flex flex-col justify-between w-full h-48 p-4'>
        <Textarea placeholder={`Reply ${selectedMail.name}`}/>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <Switch id='mute'/>
            <Label htmlFor='mute' className='ml-2 text-xs text-gray-400'>Mute thread</Label>
          </div>
          <div className='flex'>
            <Button variant="ghost"><PaperClipIcon className='w-4 h-4'/></Button>
            <Button className='ml-2'>Send</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MailDetail

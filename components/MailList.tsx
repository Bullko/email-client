import React, {useContext, useEffect, useState} from 'react'
import { 
    Card, 
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle, } from './ui/card'
import { Badge } from './ui/badge'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import UserContext from './UserProvider'
import {
  StarIcon
} from '@heroicons/react/24/outline'


interface MailListProps {
  // other props...
}

const MailList = ({ ...otherProps }: MailListProps) => {

    const {active, setSelectedMail, selectedMail, setLastPage, lastPage, mails, setMails} = useContext(UserContext);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    useEffect(()=>{
     setLastPage("mailList");
     return ()=>{
      if(lastPage !== "mailDetail"){
        setSelectedMail(null)
      }
     }
    }, [lastPage, setLastPage, setSelectedMail]);

    useEffect(()=>{
      const results = mails.filter(mails=>
        mails.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results as any);
    },[searchTerm, mails, selectedMail]);

    const handleChange = (event:any)=>{
      setSearchTerm(event.target.value)
    }

    type ReadStatusType = {
        [key: string]: boolean;
      };

    const [readStatus, setReadStatus] = useState<ReadStatusType>(
        mails.reduce((acc, mail) => ({ ...acc, [mail.id]: mail.read }), {})
      );


      function openMail(mail:any){
        // Get the existing starred mails from localStorage
        const starredMailsIds = JSON.parse(localStorage.getItem('starredMails') || '[]');
      
        // Check if the mail is starred
        const isStarred = starredMailsIds.includes(mail.id);
      
        setSelectedMail({
          ...mail,
          star: isStarred
        });
      
        setReadStatus(prevStatus => {
          if (!prevStatus[mail.id]) {
            return {...prevStatus, [mail.id]: true};
          }
          return prevStatus;
        });

      }


  return (
    <div className='m-2'>
    <div className="relative">
        <input 
        placeholder="Search" 
        type='text' 
        className='w-full p-2 pl-10 border rounded-md border-slate-200 dark:border-slate-700 bg'
        value={searchTerm}
        onChange={handleChange}
        ></input>
        <MagnifyingGlassIcon className="absolute w-6 h-6 text-gray-500 transform -translate-y-1/2 left-2 top-1/2" />
      </div>
    {searchResults.map((mail: any) => (
    <Card key={mail.id} className={`mt-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 ${selectedMail && mail.id === selectedMail.id ? 'bg-gray-100 dark:bg-slate-800' : ''}`}  onClick={() => openMail(mail)}>
        <CardHeader>
        <CardTitle className='flex items-center text-lg'>{mail.name}{readStatus[mail.id] === false ? <Badge className='ml-2 animate-pulse'>new</Badge> : ""}{mail.star === true ? <StarIcon className='w-4 h-4'/> : ""}</CardTitle>
        <CardDescription>{mail.subject}</CardDescription>
      </CardHeader>
      <CardContent className='text-xs text-gray-400'>
    <p>{mail.text.slice(0,150)}...</p>
  </CardContent>
  <CardFooter className='text-xs text-gray-500'>
    <p>{mail.date.slice(0,10)}</p>
  </CardFooter>
    </Card>
    ))}
    </div>
  )
}

export default MailList

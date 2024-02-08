import React, {useContext, useEffect, useState} from 'react'
import { 
    Card, 
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle, 
} from './ui/card'
import { mails } from "@/app/data"
import UserContext from './UserProvider'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const starredList = () => {
    const {active, setSelectedMail, selectedMail} = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(()=>{
        // Retrieve the starred mails from localStorage
        const starredMailsIds = JSON.parse(localStorage.getItem('starredMails') || '[]');
        const starredMails = mails.filter(mail => starredMailsIds.includes(mail.id));
  
        const results = starredMails.filter(mail=>
          mail.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSearchResults(results as any);
      },[searchTerm, selectedMail]);

    const handleChange = (event:any)=>{
      setSearchTerm(event.target.value)
    }

    function openMail(mail:any){
      // Get the existing starred mails from localStorage
      const starredMailsIds = JSON.parse(localStorage.getItem('starredMails') || '[]');
    
      // Check if the mail is starred
      const isStarred = starredMailsIds.includes(mail.id);
    
      setSelectedMail({
        ...mail,
        star: isStarred
      });
    }

  return (
    <div className='p-2'>
       
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
    <Card key={mail.id} onClick={() => openMail(mail)}  className={`mt-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 ${selectedMail && mail.id === selectedMail.id ? 'bg-gray-100 dark:bg-slate-800' : ''}`} >
        <CardHeader>
        <CardTitle className='flex items-center text-lg'>{mail.name}</CardTitle>
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

export default starredList
import React, { useState, useEffect, useContext } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserContext from './UserProvider'

const ContactsNames = () => {
  const { selectedContact, setSelectedContact, contacts } = useContext(UserContext)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const results = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results as any);
  }, [searchTerm]);

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  function selectContact(contact: any) {
    setSelectedContact(contact)
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
      {searchResults.map((contact: any) => {
        return (
          <Card key={contact.id} onClick={() => { selectContact(contact) }} className={`mt-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 ${selectedContact && contact.id === selectedContact.id ? 'bg-gray-100 dark:bg-slate-800' : ''}`}>
            <CardHeader>
              <div className='flex py-2'>
                <Avatar className="mr-2">
                  <AvatarImage src={contact.image} className='object-cover' />
                  <AvatarFallback className='text-white bg-purple-500'>{contact.name.split(" ").map((word: string) => word[0]).join("")}</AvatarFallback>
                </ Avatar>
                <CardTitle className='flex items-center text-lg'>{contact.name}</CardTitle>
              </div>
              <CardDescription>{contact.email}</CardDescription>
            </CardHeader>
          </Card>
        )
      })}
    </div>
  )
}

export default ContactsNames
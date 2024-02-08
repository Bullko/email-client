"use client"

import React, { useState } from 'react';
import {mails as initialMails} from "@/app/data"
import { contacts as initialContacts } from '@/app/data'

const UserContext = React.createContext<UserContextType>({} as UserContextType);

interface UserContextType {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  userMail: string;
  setUserMail: React.Dispatch<React.SetStateAction<string>>;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  selectedMail: Mail | null;
  setSelectedMail: React.Dispatch<React.SetStateAction<Mail | null>>;
  lastPage: string;
  setLastPage: React.Dispatch<React.SetStateAction<string>>;
  mails: Mail[];
  setMails: React.Dispatch<React.SetStateAction<Mail[]>>;
  updateSelectedMail: (mail: Mail | null) => Mail | null;
  selectedContact: Contact | null;
  setSelectedContact:React.Dispatch<React.SetStateAction<Contact | null>>;
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  isCollapsed: boolean,
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;

}

interface Mail {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  date: string;
  star: boolean;
  read: boolean;
  labels: string[];
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  adress: string;
  image: string;
  note: string;
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState("Anton");
  const [lastName, setLastName] = useState("Krajnak")
  const [userMail, setUserMail] = useState("anton.krajnak@gmail.com");
  const [active, setActive] = useState("inbox")
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [lastPage, setLastPage] = useState("")
  const [mails, setMails] = useState(initialMails);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [contacts, setContacts] = useState(initialContacts);
  const [isCollapsed, setIsCollapsed] = useState(false)

 

  const updateSelectedMail = (mail:Mail | null) =>{
    setSelectedMail(mail)
    
    if (mail) {
      setMails(prevMails =>
        prevMails.map(m =>
          m.id === mail.id ? { ...m, star: mail.star } : m
        )
      );
    }
    return mail;
  };
 
  return (
    <UserContext.Provider value={{ 
        user, setUser, 
        userMail, setUserMail, 
        active, setActive, 
        lastName, setLastName, 
        selectedMail, setSelectedMail,
        updateSelectedMail,
        lastPage, setLastPage,
        mails, setMails,
        selectedContact, setSelectedContact,
        contacts, setContacts,
        isCollapsed, setIsCollapsed,
        } }>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;


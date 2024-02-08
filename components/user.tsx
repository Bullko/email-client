import React, { useContext, useState, useEffect, useRef } from 'react';
import UserContext from './UserProvider';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ThemeToggle } from './ThemeToggle';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useToast } from "@/components/ui/use-toast"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const user = () => {

  const { user: initialUser, userMail, lastName: initialLastName } = useContext(UserContext) as { user: string, userMail: string, lastName: string }
  const [user, setUser] = useState(initialUser)
  const [lastName, setLastName] = useState(initialLastName)
  const [newName, setNewName] = useState("")
  const [newLastName, setNewLastName] = useState("")
  const { toast } = useToast();
  const [panelWidth, setPanelWidth] = useState(null);
  const panelRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean | null>(null);

  useEffect(() => {
    if (panelRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          setPanelWidth(entry.contentRect.width as any);
          setIsCollapsed(entry.contentRect.width < 170);

        }
      });

      resizeObserver.observe(panelRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [panelRef.current]);


  function initials() {
    if (newName.length > 0 && newLastName.length > 0) {
      return `${user[0]}${lastName[0]}`
    } else {
      return `${user[0]}`
    }
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setUser(newName);
    setLastName(newLastName);
    toast({
      title: "Success!",
      description: "Your changes has been saved!",
      variant: "default",
      duration: 3000,
      style: { backgroundColor: '#1CFEBA', color: "black" },
    });
  }

  return (
    <div className={`flex items-center ${isCollapsed? "justify-center" : ""}`} ref={panelRef}>
      <Sheet>
        <SheetTrigger>
          <Avatar className="mr-2">
            <AvatarImage src="" />
            <AvatarFallback className='text-white bg-purple-500'>{initials()}</AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <h3 className='font-bold'>{user} {lastName}</h3>
            <p className='text-xs'>{userMail}</p>
            <Separator />
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here.
            </SheetDescription>
            < Separator />
          </SheetHeader>
          <ThemeToggle />
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor='user'>
                Change your name
              </Label>
              <Input id='user' required className='mt-2' placeholder='New name here' value={newName} onChange={(e) => setNewName(e.target.value)} />
              <div className='mt-2'>
                <Label htmlFor='sureName'>
                  Change your surename
                </Label>
                <Input id='sureName' required className='mt-2' placeholder='New surename here' value={newLastName} onChange={(e) => setNewLastName(e.target.value)} />
                <Button className='w-full mt-4' onClick={handleSave}>SAVE</Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className={`${panelWidth && panelWidth < 170 ? "hidden" : ""}flex flex-col items-left justify-start ${isCollapsed? "justify-center" : ""}`}>
        
        <h3 className={`font-bold ${panelWidth && panelWidth < 170 ? "hidden" : ""}`}>
          {user} {lastName}
        </h3>
        <p className={`text-xs text-slate-700 dark:text-slate-500 ${panelWidth && panelWidth < 200 ? "hidden" : ""}`}>{userMail}</p>
      </div>
    </div>
  )
}

export default user
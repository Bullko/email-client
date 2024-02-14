import React, { useContext, useEffect, useState } from 'react'
import { Separator } from './ui/separator'
import UserContext from './UserProvider'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from "@/components/ui/use-toast"
import {
  DevicePhoneMobileIcon,
  PencilIcon,
  EnvelopeIcon,
  TrashIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Button } from './ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Textarea } from './ui/textarea'
import { Toggle } from "./ui/toggle"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"



const ContactDetail = () => {

  const { selectedContact, setSelectedContact, contacts } = useContext(UserContext)
  const [name, setName] = useState(selectedContact ? selectedContact.name : "");
  const [adress, setAdress] = useState(selectedContact ? selectedContact.adress : "");
  const [email, setEmail] = useState(selectedContact ? selectedContact.email : "");
  const [phone, setPhone] = useState(selectedContact ? selectedContact.phone : "");
  const [note, setNote] = useState(selectedContact ? selectedContact.note : "");
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { toast } = useToast();

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (selectedContact && selectedContact.id) {
      setSelectedContact({
        ...selectedContact,
        name: name,
        adress: adress,
        email: email,
        phone: phone,
        note: note,
      });
      setName("");
      setAdress("");
      setEmail("");
      setPhone("");
      setNote("");
      setSheetOpen(false)
    } else {
      console.error("Selected contact is not defined or missing ID.")
    }
    toast({
      title: "Success!",
      description: "Your changes has been saved!",
      variant: "default",
      duration: 3000,
      style: { backgroundColor: '#1CFEBA', color: "black" },
    });
  };

  useEffect(() => {
    if (isSheetOpen && selectedContact) {
      setName(selectedContact.name);
      setAdress(selectedContact.adress);
      setEmail(selectedContact.email);
      setPhone(selectedContact.phone);
      setNote(selectedContact.note);
    }
  }, [isSheetOpen, selectedContact]);

  if (!selectedContact) {
    return <div className='flex items-center justify-center w-full h-full '>👋🏻 Select contact for more details</div>
  };

  return (
    <div className='flex flex-col flex-wrap w-full'>
      <div className="h-[58px] flex flex-col justify-items-center items-center w-full mt-4">
        <Avatar className="w-[100px] h-[100px] mb-4">
          <AvatarImage className='object-cover' src={selectedContact.image} />
          <AvatarFallback className='text-[40px] text-white bg-purple-500'>{selectedContact.name.split(" ").map(word => word[0]).join("")}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{selectedContact.name}</h1>
        <p>{selectedContact.email}</p>
        <div className='m-2'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost"><DevicePhoneMobileIcon className='w-4 h-4' /></Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Call {selectedContact.name}</DialogTitle>
                  <DialogDescription>
                    Do you really want to call {selectedContact.name}?
                  </DialogDescription>
              </DialogHeader>
              <div className='flex flex-col items-center justify-center gap-2 p-2'>
                <h2 className='text-xl font-bold'>{selectedContact.phone}</h2>
                <div className='gap-2 p-2'>
                  <Button className='mr-2'><DevicePhoneMobileIcon className='w-4 h-4 mr-2' />CALL</Button>
                  <DialogClose>
                    <Button variant="ghost"><XMarkIcon className='w-4 h-4 mr-2'/>CANCEL</Button>
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Drawer>
            <DrawerTrigger>
              <Button variant="ghost"><EnvelopeIcon className='w-4 h-4' /></Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="w-full h-full max-w-xl mx-auto my-4">
                <DrawerHeader>
                  <DrawerTitle>Write email to {selectedContact.name}</DrawerTitle>
                </DrawerHeader>
                <div className='flex flex-col justify-between w-full p-4 h-80'>
                  <Textarea className=' h-80' placeholder={`Send email to ${selectedContact.name}`} />

                  <div className='my-2'>
                    <Toggle className='w-10 h-10 p-2 mr-1'><span className='font-bold '>B</span></Toggle>
                    <Toggle className='w-10 h-10 p-2 mr-1'><span className='font-serif italic'>I</span></Toggle>
                    <Toggle className='w-10 h-10 p-2 mr-1'><span className='underline'>U</span></Toggle>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex items-center'>
                      <Button variant="outline">Save to Drafts</Button>
                    </div>
                    <div className='flex'>
                      <Button variant="ghost"><PaperClipIcon className='w-4 h-4' /></Button>
                      <Button className='ml-2'>Send</Button>
                    </div>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          <Sheet>
            <SheetTrigger asChild onClick={() => setSheetOpen(true)}>
              <Button variant="ghost"><PencilIcon className='w-4 h-4' /></Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit contact</SheetTitle>
                <SheetDescription>
                  Make changes to your contact here. Click save when you are done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor='user'>Change contact name</Label>
                  <Input id='user' className='mt-2 mb-4' placeholder='New contact name here' value={name} onChange={(e) => setName(e.target.value)} />

                  <Label htmlFor='email'>Change contact email address</Label>
                  <Input id='email' className='mt-2 mb-4' placeholder='New email here' value={email} onChange={(e) => setEmail(e.target.value)} />

                  <Label htmlFor='phone'>Change contact phone number</Label>
                  <Input id='phone' className='mt-2 mb-4' placeholder='New phone here' value={phone} onChange={(e) => setPhone(e.target.value)} />

                  <Label htmlFor='address'>Change contact address</Label>
                  <Input id='address' className='mt-2 mb-4' placeholder='New address here' value={adress} onChange={(e) => setAdress(e.target.value)} />

                  <Label htmlFor='note'>Add note to your contact</Label>
                  <Textarea id="note" className='mt-2 mb-4' placeholder='New note here' value={note} onChange={(e) => setNote(e.target.value)} />
                </div>
                <SheetFooter>

                  <SheetClose asChild>
                    <Button className='w-full mt-4' onClick={handleSave} type='submit'>SAVE</Button>
                  </SheetClose>
                </SheetFooter>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Separator className='m-2' />
        <div className='flex flex-wrap justify-between w-full p-4 text-center'>
          <div className='flex-1'>
            <h3 className='font-bold'>Phone number</h3>
            <p className='text-gray-600 dark:text-gray-400'>{selectedContact.phone}</p>
          </div>
          <Separator orientation='vertical' className='m-2' />
          <div className='flex-1'>
            <h3 className='font-bold'>Adress</h3>
            <p className='text-gray-600 dark:text-gray-400'>{selectedContact.adress}</p>
          </div>
        </div>
        <div className='w-full p-4 rounded-lg'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25422034055!2d-74.14483093747461!3d40.697630744599735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2zTmV3IFlvcmssIFNwb2plbsOpIMWhdMOhdHkgYW1lcmlja8Op!5e0!3m2!1ssk!2ssk!4v1705999572497!5m2!1ssk!2ssk" width="100%" height="200" loading="lazy" ></iframe>
        </div>
        <div className='w-full p-4'>
          <h3 className='font-bold'>Note</h3>
          <p className='text-gray-600 dark:text-gray-400'>{selectedContact.note ? selectedContact.note : "Add some notes to your contact"}</p>
        </div>
      </div>

    </div>

  )
}

export default ContactDetail
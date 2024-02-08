import React from 'react'
import {
    ToggleGroup,
    ToggleGroupItem,
  } from "@/components/ui/toggle-group"
  import { Separator } from './ui/separator'

const toggle = () => {
  return (
    
    <ToggleGroup type="single">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">        
        <h2>All mails</h2>        
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <h2>Unread</h2> 
      </ToggleGroupItem>
    </ToggleGroup>
   
    
  )
}

export default toggle
import React from 'react'
import BreadCrumb from './bread-crumb'
import { Card } from '../ui/card'
import { Headphones, Star, Trash } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ThemeToggle } from '@/themes/theme-toggle'
import { UserButton } from '@clerk/nextjs'

type Props = {}

const InfoBar = (props: Props) => {
  return (
    <div className="flex w-full justify-between items-center py-1 pr-4 mb-8 ">
     
      <BreadCrumb />
      <div className="flex gap-3 items-center">
        <div>
         
          <ThemeToggle />
          
        </div>

        {/* <Avatar>
          <AvatarImage
            src="/images/user-icon.png"
            alt="@shadcn"
           
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
        <UserButton />
      </div>
    </div>
  )
}

export default InfoBar

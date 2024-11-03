import { onLoginUser } from '@/services/auth'
import SideBar from '@/components/sidebar'
import { ChatProvider } from '@/context/user-chat-context'
import React from 'react'
import NavBar from '@/components/navbar'

type Props = {
  children: React.ReactNode
}

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await onLoginUser()
  if (!authenticated) return null

  return (
    <ChatProvider>
      <div className="flex h-screen w-full">
        <SideBar domains={authenticated.domain} />
        <div className="w-full h-screen flex p-4 flex-col pl-20 md:pl-4">
          {children}
        </div>
      </div>
    </ChatProvider>
  )
}

export default OwnerLayout

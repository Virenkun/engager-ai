import { useToast } from '@/components/ui/use-toast'
import { UserLoginProps, UserLoginSchema } from '@/schemas/auth.schema'
import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { set } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { redirect } from 'next/navigation'

export const useSignInForm = () => {
  const { isLoaded, setActive, signIn, setSession } = useSignIn()
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: 'onChange',
  })

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginProps) => {
      if (!isLoaded) return

      try {
        setLoading(true)
        const authenticated = await signIn.create({
          identifier: values.email,
          password: values.password,
        })

        console.log("auth", authenticated)

        if (authenticated.status === 'complete') {
          const res = await setActive({ session: authenticated.createdSessionId })
          console.log("res", res);
          toast({
            title: 'Success',
            description: 'Welcome back!',
          })
          // Use redirect instead of router.push
          redirect('/dashboard')
        }
      } catch (error: any) {
        setLoading(false)
        if (error?.errors?.[0]?.code === 'form_password_incorrect') {
          toast({
            title: 'Error',
            description: 'Email/password is incorrect. Please try again.',
          })
        }
      }
    }
  )

  return {
    methods,
    onHandleSubmit,
    loading,
  }
}


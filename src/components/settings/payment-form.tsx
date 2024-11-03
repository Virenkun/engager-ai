'use client'
import React from 'react'
import { CardDescription } from '../ui/card'
import { Loader } from '../loader'
import { PaymentElement } from '@stripe/react-stripe-js'
import { Button } from '../ui/button'
import { useCompletePayment } from '@/hooks/billing/use-billing'


type PaymentFormProps = {
  plan: 'STANDARD' | 'PRO' | 'ULTIMATE'
}

export const PaymentForm = ({ plan }: PaymentFormProps) => {
  const { processing, onMakePayment } = useCompletePayment(plan)
  return (
    <form
      onSubmit={onMakePayment}
      className="flex flex-col gap-5"
    >
      <div>
        <h2 className="font-semibold text-xl text-black dark:text-white">Payment Method</h2>
        <CardDescription>Enter your card details</CardDescription>
      </div>
      <PaymentElement className='text-black dark:text-white' />
      <Button type="submit" className='bg-violet-700 hover:bg-violet-800 text-white font-semibold'>
        <Loader loading={processing}>Pay</Loader>
      </Button>
    </form>
  )
}

'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/util/supabase/server'

export async function signup(formData) {
  
  const supabase = createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  console.log(data)
  
  const { error } = await supabase.auth.signUp(data)

  if (error) {
   console.log(error)
  }

  revalidatePath('/', 'layout')
  redirect('/signin')
}
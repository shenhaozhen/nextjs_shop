'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/util/supabase/server'

export async function uploadProduct(formData) {
    
    const data = {
        name: formData.get('name'),
    }
    
    console.log(data)

  //redirect('/account')
}
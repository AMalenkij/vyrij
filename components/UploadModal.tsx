'use client'

import uniqid from 'uniqid'
import React, { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'

import Modal from './Modal'
import Input from './Input'
import Button from './Button'

function UploadModal() {
  const [isLoading, setIsLoading] = useState(false)

  const uploadModal = useUploadModal()
  const supabaseClient = useSupabaseClient()
  const { user } = useUser()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      image: null,
    },
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      uploadModal.onClose()
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      const imageFile = values.image?.[0]

      if (!imageFile || !user) {
        toast.error('Missing fields')
        return
      }

      const uniqueID = uniqid()

      // Upload image
      const {
        data: imageData,
        error: imageError,
      } = await supabaseClient
        .storage
        .from('photos')
        .upload(`image-${uniqueID}`, imageFile, {
          cacheControl: '3600',
          upsert: false,
        })

      if (imageError) {
        setIsLoading(false)
        return toast.error('Failed image upload')
      }

      // Create record
      const { error: supabaseError } = await supabaseClient
        .from('photos')
        .insert({
          user_id: user.id,
          href: imageData.path,
        })

      if (supabaseError) {
        return toast.error(supabaseError.message)
      }

      router.refresh()
      setIsLoading(false)
      toast.success('img added!')
      reset()
      uploadModal.onClose()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Add photo"
      description="Upload an img file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <div>
          <div className="pb-1">
            Select an image
          </div>
          <Input
            placeholder="test"
            disabled={isLoading}
            type="file"
            accept="image/*"
            id="image"
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  )
}

export default UploadModal

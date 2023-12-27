import { twMerge } from 'tailwind-merge'

import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import useUploadModal from '@/hooks/useUploadModal'

interface TempBtnProps {
  children: React.ReactNode
  className?: string
}
export default function TempBtn({ children, className } : TempBtnProps) {
  const { user } = useUser()
  const uploadModal = useUploadModal()
  const authModal = useAuthModal()

  const onClick = () => {
    if (!user) return authModal.onOpen()
    return uploadModal.onOpen()
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        `
     flex
     items-center
     gap-3
     text-5xl 
        `,
        className,
      )}
    >
      { children }
    </button>
  )
}

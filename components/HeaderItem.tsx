import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface HeaderItemProps {
  label:string
  active?:boolean
  href:string
}
export default function HeaderItem({ label, active, href } : HeaderItemProps) {
  return (
    <Link
      href={href}
      className={twMerge('text-neutral-400 cursor-pointer hover:text-yellow-300 transition', active && 'text-white')}
    >
      <p>{label}</p>
    </Link>
  )
}

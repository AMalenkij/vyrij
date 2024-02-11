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
      className={twMerge('text-black cursor-pointer hover:text-zinc-500 transition', active && 'text-red-700')}
    >
      <p>{label}</p>
    </Link>
  )
}

import Link from 'next/link'

import IconSideMenu from '@/public/svg/IconSideMenu'
import { CustomMajorEvents } from '@/types'

export default function SideMenu({ majorEvents }:{ majorEvents:CustomMajorEvents[] }) {
  return (
    <div className="fixed z-10 font-heading text-14 top-1/4 left-12">
      <div className="mb-6">
        <Link href="timeline">
          <button type="button" aria-label="Menu" className="transition-color duration-500 hover:text-white py-6">
            <IconSideMenu />
          </button>
        </Link>
      </div>
      {majorEvents?.map((elm) => (
        <div className="my-6">
          <Link href={`/event/#${elm.year}`}>
            <button
              key={elm.year}
              type="button"
              data-to-scrollspy-id={elm.year.toString()}
              aria-label={elm.year.toString()}
              className="transition-color duration-500 hover:text-white"
            >
              {elm.year}
              <span className="text-10">р</span>
            </button>
          </Link>
        </div>
      ))}
    </div>
  )
}

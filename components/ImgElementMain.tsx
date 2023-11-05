import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

interface ImgElementMainProps {
  children?: React.ReactNode
  className?: string
  name: string
  src: string
  positionX?: number
  positionY?: number
  // displacementCoefficient?: number
  hight?: number
  width?: number
}
export default function ImgElementMain({
  children,
  className,
  name,
  src,
  positionX,
  positionY,
  // displacementCoefficient,
  hight,
  width,
} : ImgElementMainProps) {
  const imageStyle = {
    top: `${positionY}%`,
    left: `${positionX}%`,
  }
  return (
    <Image
      src={src}
      width={width}
      height={hight}
      alt={name}
      className={twMerge(
        `
      absolute
      bg-slate-500
      border-l-rose-300
        `,
        className,
      )}
      style={imageStyle}
    >
      { children }
    </Image>
  )
}

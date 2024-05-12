import Logo from '@/components/Logo'
import NavMenuToggle from '@/components/header/NavMenuToggle'
import NavMenu from '@/components/header/NavMenu'
import SVGLogoVyrij from '@/public/svg/LogoVyrij'
import MenuAnimationControl from './MenuAnimationControl'

export default function Header() {
  return (
    <header className="grid grid-cols-3 relative z-[100]">
      <MenuAnimationControl><NavMenu /></MenuAnimationControl>
      <Logo>
        Chor |
        <SVGLogoVyrij />
      </Logo>
      <NavMenuToggle />
    </header>
  )
}

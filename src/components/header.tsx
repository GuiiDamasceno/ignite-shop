import Link from "next/link";
import Image from 'next/image'
import { Bag } from '@phosphor-icons/react'
import logoImage from '../assets/logo.svg'

import { HeaderContainer } from '../styles/components/header'
import { useShoppingCart } from "use-shopping-cart";

interface HeaderProps {
  isCartModalOpen: boolean;
  openCartModal: () => void;
 
}

export function Header({ isCartModalOpen, openCartModal }: HeaderProps) {
  const { cartCount } = useShoppingCart()

  return (
    <HeaderContainer>
      <Link href='/'>
        <Image src={logoImage} alt='' />
      </Link>
      {
        !isCartModalOpen && (
          <div>
            <button onClick={openCartModal}>
              <Bag size={24} weight="bold" />
            </button>
            {cartCount > 0 && <p>{cartCount}</p>}
          </div>
        )
      }
    </HeaderContainer>
  )
}
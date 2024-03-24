"use client";
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '@/components/AppContext';
import CartIcon from '@/components/icons/CartIcon';
import { redirect } from 'next/navigation';

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session?.data?.user;
  let userName = userData?.name || userData?.email;

  const {cartProducts} = useContext(CartContext);

  if (userName && userName.includes(' ')){
    userName = userName.split(' ')[0];
  }

  function handleLogout(){
    signOut();
    return redirect('/');
  }

  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-8 text-gray-400 font-semibold">
        <Link 
          className="text-emerald-700 font-semibold text-2xl" 
          href={'/'}>
          Coffe Shop
        </Link>
        <Link href={'/'}>Home</Link>
        <Link href={'/menu'}>Menu</Link>
        <Link href={'/#about'}>About</Link>
        <Link href={'/#contact'}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-400 font-semibold">
        {status === 'authenticated' && (
          <>
            <Link href={'/profile'} className="whitespace-nowrap">Hello, {userName}</Link>
            <button 
              onClick={handleLogout}
              className="bg-emerald-500 rounded-full text-white px-8 py-2"
            >
              Logout
            </button>
          </>
          
        )}
        {status !== 'authenticated' && (
          <>
            <Link href={'/login'} className="">
              Login
            </Link>
            <Link href={'/register'} className="bg-emerald-500 rounded-full text-white px-8 py-2">
              Register
            </Link>
          </>
        )}
        <Link href={'/cart'} className="bg-emerald-500 rounded-full text-white px-8 py-2 flex flex-row">
          <CartIcon />
          ({cartProducts?.length})
        </Link>
      </nav>
    </header>
  )
}
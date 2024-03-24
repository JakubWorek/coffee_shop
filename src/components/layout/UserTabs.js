"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({isAdmin}){
  const path = usePathname();
  return(
    <div className="flex justify-center mx-auto gap-2 tabs">
      <Link 
        className={path === '/profile' ? 'active' : ''} 
        href={'/profile'}
      >
          Profile
      </Link>
      {isAdmin && (
        <>
          <Link 
            href={'/categories'}
            className={path === '/categories' ? 'active' : ''}
          >
              Categories
          </Link>
          <Link 
            href={'/products'}
            className={path.includes('products') ? 'active' : ''}
          >
            Products
          </Link>
        </>
      )}
      <Link 
        href={'/orders'}
        className={path === '/orders' ? 'active' : ''}
      >
        Orders
      </Link>
    </div>
  )
}
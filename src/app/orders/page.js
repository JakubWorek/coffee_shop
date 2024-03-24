'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function OrdersPage() {
  const session = useSession();
  const {status} = session;

  const [orders, setOrders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.reverse());
      });
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data.admin);
      });
  }, []);

  if (status === 'unauthenticated'){
    return redirect('/');
  }

  function dbTimeToReadable(str){
    return str.replace('T', ' ').substring(0, 16);
  }

  return (
    <section className='mt-8 max-w-2xl mx-auto'>
      <UserTabs isAdmin={isAdmin}/>
      <div className="text-center">
        <SectionHeaders mainHeader="Orders"/>
      </div>
      <div className="mt-8">
        {orders?.length >0 && orders.map(order => (
          <div className="bg-gray-200 border p-4 mb-2 rounded-lg grid grid-cols-3">
            <div className="flex items-center">
              <span 
                className={(order.paid ? "bg-green-400" : "bg-red-400") + " text-white p-2 border rounded-lg"}
              >
                {order.paid ? "Paid" : "Not Paid"}
              </span>
            </div>
            <div className="text-gray-500">
              <div>
                Items: {order.cartProducts.length}
              </div>
              {order.userEmail ? order.userEmail : "Guest"}
            </div>
            <div className="text-right gap-2 flex items-center">
              <div className="">
                {dbTimeToReadable(order.createdAt)}
              </div>
              <Link 
                href={`/orders/${order._id}`}
                className="bg-blue-400 text-white p-2 border rounded-lg"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
}
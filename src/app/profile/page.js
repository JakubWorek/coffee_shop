"use client";
import { useSession } from "next-auth/react";
import EditableImage from "@/components/layout/EditableImage";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";

export default function ProfilePage() {
  const session = useSession();
  const {status} = session;

  const [userName, setUserName] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAdress, setStreetAdress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const [isSavind, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (status === 'authenticated'){
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch('/api/profile')
        .then(res => res.json())
        .then(data => {
          setPhone(data.phone);
          setStreetAdress(data.streetAdress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.admin);
        })
    }
  }, [session, status]);

  if (status === 'loading'){
    return 'Loading...';
  }

  if (status === 'unauthenticated'){
    return redirect('/login');
  }

  async function handleProfileInfoUpdate(e){
    e.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName, 
        image: image,
        phone: phone,
        streetAdress: streetAdress,
        postalCode: postalCode,
        city: city,
        country: country,
      })
    })
    setIsSaving(false);
    if (response.ok){
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 1000);
    }
  }

  return(
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin}/>
      <h1 className="text-center text-emerald-600 text-4xl mb-4">
        Profile
      </h1>
      <div className="max-w-md mx-auto">
        {saved && (
          <h2 className="text-center bg-green-100 p-4 rounded-lg border-green-300">
            Profile saved!
          </h2>
        )}
        {isSavind && (
          <h2 className="text-center bg-yellow-100 p-4 rounded-lg border-yellow-300">
            Saving...
          </h2>
        )}
        <div className="flex gap-4">
          <div>
            <div className="p-4 rounded-xl relative max-w-[xs]">
              <EditableImage link={image} setLink={setImage}/>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input type="text" 
              placeholder="First and last name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input type="email" disabled={true} value={session.data.user.email}/>
            <input type="tel" 
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input type="text"
              placeholder="Street Adress"
              value={streetAdress}
              onChange={(e) => setStreetAdress(e.target.value)}
            />
            <div className="flex gap-4">
              <input type="text"
                style={{'margin' : '0'}}
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <input type="text"
                style={{'margin' : '0'}}
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <input type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <button type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
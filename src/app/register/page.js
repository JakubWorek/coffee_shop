"use client";
import Image from "next/image";
import Link from "next/link";
import {signIn} from "next-auth/react";
import { useState } from "react";

export default function RegisterPage () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    if (response.ok) {
      setUserCreated(true);
    }
    else {
      setError(true);
    }
    setCreatingUser(false);
  }

  return(
    <section className="mt-8">
      <h1 className="text-center text-emerald-600 text-4xl mb-4">
        Register
      </h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created successfully<br/> Now you can{' '}
          <Link
            href={"/login"}
            className="underline">
              login
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          Something went wrong ...<br/> Please try again later
      </div>
      )}
      <form className="block max-w-xs mx-auto" 
        onSubmit={handleFormSubmit}
      >
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          disabled={creatingUser}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          disabled={creatingUser}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          type="submit"
          disabled={creatingUser}
          >
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with social media
        </div>
        <button 
          className="flex gap-4 justify-center"
          onClick={() => signIn('google', {callbackUrl: '/'})}
        >
          <Image src={'/google.png'} alt={''} width={24} height={24}/>
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500">
          Already have an account?{' '}
          <Link
            href={"/login"}
            className="underline">
              Login
          </Link>
        </div>
      </form>
    </section>
  );
}
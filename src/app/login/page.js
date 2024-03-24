"use client";
import { useState } from "react";
import {signIn} from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoginInProgress(true);
    await signIn('credentials', {email, password, callbackUrl: '/'});
    setLoginInProgress(false);
  }

  return(
    <section className="mt-8">
      <h1 className="text-center text-emerald-600 text-4xl mb-4">
        Login
      </h1>
      <form className="block max-w-xs mx-auto" 
        onSubmit={handleFormSubmit}
      >
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          value={email}
          disabled={loginInProgress}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          name="password"
          placeholder="Password"
          value={password}
          disabled={loginInProgress}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          type="submit"
          disabled={loginInProgress}
        >
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with social media
        </div>
        <button 
          type = "button"
          className="flex gap-4 justify-center"
          onClick={() => signIn('google', {callbackUrl: '/'})}
        >
          <Image src={'/google.png'} alt={''} width={24} height={24}/>
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500">
          No account, no problem ?{' '}
          <Link
            href={"/register"}
            className="underline">
              Register now
          </Link>
        </div>
      </form>
    </section>
  )
}
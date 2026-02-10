"use client"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {cn} from "@/lib/utils"
import {useRouter, useSearchParams} from "next/navigation"
import React, {useRef, useState, useTransition} from "react"
import {loginAction} from "@/app/login/loginAction"
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [error, setError] = useState<string|null>(null);

  const rememberMe = useRef(false);

  const [pending, startTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") ?? "/";



  const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);

    const formData = new FormData(e.currentTarget);

    formData.append("remember",rememberMe.current ? "true" : "false");

    startTransition( async () =>{
      const result = await loginAction(formData)
      if (result?.statusCode !== 200) {
        console.log(result)
        setError("Ismeretlen hiba történt")
      }
      else{
        router.push(redirectPath);
      }
    })
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit} >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Bejelentkezés</h1>
      </div>
      {error && (
        <div className="rounded bg-red-100 text-red-700 p-3 text-sm border border-red-400">
          {error}
        </div>
      )}
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Felhasználónév</Label>
          <Input id="username" type="email" placeholder="geza@minta.hu" name="username" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Jelszó</Label>
          <Input id="password" type="password" name="password" required />
        </div>
        <div className="flex gap-2 items-center align-middle">
          <Checkbox
            onCheckedChange={(checked) => {
              rememberMe.current = !!checked;
            }}
            id="rememberMe"
          />
          <Label htmlFor="rememberMe">Emlékezz rám!</Label>
        </div>
        <Button type="submit" className="w-full cursor-pointer" disabled={pending}>
          {pending ? "Bejelentkezés..." : "Bejelentkezés"}
        </Button>
        <Link
            href={"/login/forgot-password"}
        >
          <Button type="button" variant={"secondary"} className="w-full cursor-pointer" disabled={pending}>
            Új jelszó igénylése
          </Button>
        </Link>
      </div>
      <div className="text-center text-sm">
        <p>
          Nem rendelkezel még fiókkal?
        </p>
        <p>
          Sajnáljuk, de az oldalon a regisztráció jelenleg nem lehetséges.
        </p>
      </div>
    </form>
  )
}

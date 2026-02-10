"use client"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {cn} from "@/lib/utils"
import {useRouter, useSearchParams} from "next/navigation"
import React, {useState, useTransition} from "react"
import Link from "next/link";
import {backend} from "@/lib/backend";
import {toast} from "sonner";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [error, setError] = useState<string|null>(null);

  const [pending, startTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");



  const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition( async () =>{
      const result = await backend("reset-password","POST",{email:email, token:token, password:formData.get("password")?.toString() ?? "", password_confirmation:formData.get("password_confirmation")?.toString() ?? ""});
      if (result?.statusCode !== 200) {
        console.log(result)
        setError("Ismeretlen hiba történt")
      }
      else{
        toast("Jelszó módosítása sikeres.")
        router.push("/");
      }
    })
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit} >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Új jelszó beállítása</h1>
      </div>
      {error && (
        <div className="rounded bg-red-100 text-red-700 p-3 text-sm border border-red-400">
          {error}
        </div>
      )}
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="password">Új jelszó</Label>
          <Input id="password" type="password" name="password" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password_confirmation">Jelszó megerősítése</Label>
          <Input id="password_confirmation" type="password" name="password_confirmation" required />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Folyamatban..." : "Új jelszó beállítása"}
        </Button>
        <Link
            href={"/login"}
        >
          <Button type="button" variant={"secondary"} className="w-full cursor-pointer" disabled={pending}>
            Vissza a bejelentkezéshez
          </Button>
        </Link>
      </div>
    </form>
  )
}

"use client"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {cn} from "@/lib/utils"
import {useRouter} from "next/navigation"
import React, {useState, useTransition} from "react"
import Link from "next/link";
import {backend} from "@/lib/backend";
import {toast} from "sonner";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [error, setError] = useState<string|null>(null);

  const [pending, startTransition] = useTransition();

  const router = useRouter();



  const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition( async () =>{
      const result = await backend("forgot-password","POST",{email:formData.get("email")?.toString() ?? ""})
      if (result?.statusCode !== 200) {
        console.log(result)
        setError("Ismeretlen hiba történt")
      }
      else{
        toast("Jelszó helyreállító email sikeresen kiküldve.")
        router.push("/");
      }
    })
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit} >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Új jelszó igénylése</h1>
      </div>
      {error && (
        <div className="rounded bg-red-100 text-red-700 p-3 text-sm border border-red-400">
          {error}
        </div>
      )}
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email cím</Label>
          <Input id="email" type="email" placeholder="geza@minta.hu" name="email" required />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Folyamatban..." : "Új jelszó igénylés"}
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

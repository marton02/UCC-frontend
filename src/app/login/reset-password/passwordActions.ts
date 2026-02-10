import {backend} from "@/lib/backend";

export async function forgotPassword(formData: FormData) {
    console.log(formData);
    const req = await backend("forgot-password","POST",{email:formData.get("email")?.toString() ?? ""})

    console.log(req)
}
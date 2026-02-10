import {Suspense} from "react";
import {ForgotPasswordForm} from "@/components/forgot-password-form";

export default function ResetPassword() {
    return (
        <Suspense>
            <ForgotPasswordForm />
        </Suspense>
    );
}

import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/lib/auth";
import ILoginResponse from "@/interfaces/ILoginResponse";

export async function middleware(request: NextRequest){
    const authToken = request.cookies.get("auth")?.value
    const refreshToken = request.cookies.get("refresh")?.value
    const remember = request.cookies.get("remember")?.value

    const isAuthenticated = !!authToken;

    if(!isAuthenticated){
        if(refreshToken){
            const resp: ILoginResponse = (await auth({grant_type: 'refresh_token',refresh_token:refreshToken})) as ILoginResponse

            if(resp.statusCode === 200){
                const returnResponse = NextResponse.next()

                returnResponse.cookies.set("auth",resp.data.access_token,{
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    path: "/",
                    sameSite: "lax",
                    maxAge: resp.data.expires_in
                })

                returnResponse.cookies.set("refresh",resp.data.refresh_token,{
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    path: "/",
                    sameSite: "lax",
                    maxAge: remember === "AcbduXHw8MbwAPWnOiQf9Rys468A1WDZ" ? 60*60*2191.45 : 60*60*8
                })

                if(remember === "AcbduXHw8MbwAPWnOiQf9Rys468A1WDZ"){
                    returnResponse.cookies.set("remember","AcbduXHw8MbwAPWnOiQf9Rys468A1WDZ",{
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        path: "/",
                        sameSite: "lax",
                        maxAge: 60*60*2191.45
                    })
                }

                return returnResponse
            }
        }

        const loginUrl = new URL("/login", request.url)

        loginUrl.searchParams.set("redirect",request.nextUrl.pathname)

        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!login|logout|_next|favicon.ico|api).*)",
    ]
}
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try{
        const body = await request.json()
        const {email, password} = body

        if(!email || !password){
            return NextResponse.json({message: "email atau password kosong"}, {status: 400})
        }
        const user = await prisma.users.findUnique({
            where: {
                email:email,
            }
        })
        if(password != user?.password){ return NextResponse.json({message: "password salah"}, {status: 401})}
        
        if(!user) {return NextResponse.json({message: 'user tidak ditemukan'}, {status: 404})}


        const response = NextResponse.json({
            message: 'login berhasil!',
            name: user.name,
            uuid: user.uuid,
            balance: user.balance
        })
        response.cookies.set('token', String(user.uuid), {
            path: "/",
            httpOnly: true,
            maxAge: 60 * 60 * 24
        })

        return response
        
    }catch(err){
        return NextResponse.json({err})
    }
}
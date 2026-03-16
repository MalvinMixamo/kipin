import { NextResponse } from "next/server";

export async function POST() {
    try{
        const response = NextResponse.json({message: "Berhasil logout, Bye!"}, {status: 200})
        response.cookies.set('token', '', {
            path: '/',
            maxAge:0
        })
        return response
    }catch(err){
        return NextResponse.json(err, {status: 500})
    }
}
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    try{
        const body = await request.json()
        console.log(body)
        const res = await prisma.users.create({
            data: {
                uuid: body.uuid || randomUUID(),
                name: body.name,
                email: body.email,
                password: body.password,
                balance: 0,
                id: body.id,
            }
        })
        return NextResponse.json({message: 'berhasil register!'}, {status: 201})
    }catch(err){
        return NextResponse.json({message: 'ada kesalahan saat register', err}, {status: 500})
    }
}


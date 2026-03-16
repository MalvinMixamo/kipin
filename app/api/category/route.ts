import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const category = await prisma.category.findMany()
        if(!category){
            return NextResponse.json({message: "data tidak ditemukan/masih kosong"}, {status: 404})
        }
        return NextResponse.json(category, {status: 200})
    }catch(err){
        return NextResponse.json({message: "ada kesalahan saat mendapatkan data", err}, {status: 500})
    }
}

export async function POST(request: Request) {
    const body = await request.json()
    const response = NextResponse

    try{
        const res = await prisma.category.create({
            data: {
                name: body.name,
                type: body.type,

            }
        })
        if(!res){
            return response.json({message: "ada yang salah dengan requestmu"}, {status: 400})
        }
        return response.json({message: "berhasil membuat category"}, {status: 200})
    }catch(err){
        return response.json({message: "ada kesalahan saat membuat data", err}, {status: 500})
    }
}
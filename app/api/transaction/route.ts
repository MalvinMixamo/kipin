import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try{
        const data = await prisma.transaction.findMany({
            include: {category: true}
        })
        if(!data){
            return NextResponse.json({message: "data tidak ditemukan"}, {status: 404})
        }
        return NextResponse.json(data)
    }catch(err){
        return NextResponse.json({message: "ada kesalahan saat mengambil data", err}, {status: 500})
    }
}

export async function POST(request:Request) {
    const body = await request.json()
    console.log(body)
    try{
        const res = await prisma.transaction.create({
            data: {
                amount: body.amount,
                description: body.description,
                date: body.date,
                userId: body.userId,
                categoryId: body.categoryId
            }
        })
        if(!res){
            return NextResponse.json({message: "sepertinya ada yang salah dengan requestnya"}, {status: 400})
        }
        return NextResponse.json({message: "Berhasil membuat transaksi"}, {status: 200})
    }catch(err){
        return NextResponse.json({message: "ada kesalaahan saat membuat transaksi", err}, {status: 500})
    }
}
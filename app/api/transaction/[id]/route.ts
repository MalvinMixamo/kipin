import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request, params: any) {
    const {id} = await params
    const body = await request.json()

    try{
        const res = await prisma.transaction.update({
            where: {
                id: id,
            },
            data:{
                amount: body.amount,
                description: body.description,
                date: body.date,
                userId: body.userId,
                categoryId: body.categoryId
            }
        })
        if(!res){
            return NextResponse.json({message: "sepertinya requestmu buruk"}, {status: 400})
        }
        return NextResponse.json({message: "data berhasil diupdate!"}, {status: 200})
    }catch(err){
        return NextResponse.json({message: "ada kesalahan saat update data", err}, {status: 500})
    }
}

export async function DELETE(req: Request, {params}: {params: Promise<{id: String}>}) {
    const {id} = await params
    try{
        const res = await prisma.transaction.delete({
            where: {
                id: Number(id)
            }
        })
        if(!res){
            return NextResponse.json({message: "tidak ada id yang cocok"}, {status: 404})
        }
        return NextResponse.json({message: "data berhsil dihapus"}, {status: 200})
    }catch(err){
        return NextResponse.json({message: "ada kesalahan saat mengahapus data", err}, {status: 500})
    }
}
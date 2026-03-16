import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    
    const {id} = await params
    const response = NextResponse.json
    const body = await request.json()
    console.log(body, id)

    try{
        const res = await prisma.category.update({
            where: {
                id: Number(id)
            },
            data: {
                name: body.name,
                type: body.type,
            }
        })
        if(!res){
            return response({message: "ada yang salah dengan id atau datanya", id, body}, {status: 400})
        }
        return response({message: "berhasil edit data"}, {status: 200})
    }catch(err){
        return response(err, {status: 500})
    }
}

export async function DELETE(request: Request, {params}: {params: Promise<{id: String}>}) {
    const response = NextResponse.json
    const {id} = await params
    try{
        await prisma.transaction.deleteMany({
        where: { categoryId: Number(id) }
        });

        const res = await prisma.category.delete({
        where: { id: Number(id) }
        });
        if(!res){
            return response({message: "tidak ada id yang cocok"}, {status: 404})
        }
        return response({message: "berhasil menghapus category"}, {status: 200})
    }catch(err){
        return response({message: "ada kesalahan saat menghapus category", err}, {status: 500})
    }
}
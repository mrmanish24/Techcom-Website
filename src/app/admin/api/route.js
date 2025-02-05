import connectMongoDB from "../../../lib/mongoDB";
import { NextResponse } from "next/server";
import pc_parts from "@/models/pcParts"
import { error } from "console";

export async function GET(){
    try {
        await connectMongoDB();
        const Pc_parts = await pc_parts.find();
        console.log("mongo connected | GET")
        return NextResponse.json({Pc_parts});
    } catch (error) {
        console.log(`this is error in fetching  database : ${error}`)
    }
}

export async function POST(request){
    try {
        await connectMongoDB();
        const {category, name, price} = await request.json()
        await pc_parts.create({category,name, price });
        return NextResponse.json({message:"Product successfully Added"}, {status : 200});
        
    } catch (error) {
        console.log("error:", error);
    }
}

export async function DELETE(request){
    try{
        const id = request.nextUrl.searchParams.get("id");
        await connectMongoDB();
        await pc_parts.findByIdAndDelete(id);
        return NextResponse.json(
            {message: "Delete Successfully"},
            {status: 200}
        );
    }
    catch{
        console.log(`error in deleting ${error}`);
    }
}
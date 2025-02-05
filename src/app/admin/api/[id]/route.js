import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongoDB";
import pc_parts from "../../../../models/pcParts";

export async function PUT(request,params){
try {
    const  {id} = params;
    const { newName: name, newPrice: price } = await request.json();
    await connectMongoDB();
    await pc_parts.findOneAndUpdate(id, { name, price });
    return NextResponse.json(
      { message: "update successfull" },
      { status: 200 }
    );

} catch (error) {
    console.log("error in updation",error);
}
}

export async function GET(request, {params} ){
    const {id} = await params;
    await connectMongoDB();
    const Pc_parts = await pc_parts.findOne({_id: id});
    return NextResponse.json({Pc_parts},{status:200});

}
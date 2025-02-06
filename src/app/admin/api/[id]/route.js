import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongoDB";
import Pc_parts  from "@/models/pcParts";

export async function PUT(request, context) {
  // Await the entire context object
  try {
    const { id } = await context.params;

    // Also, remember that request.json() is asynchronous
    const {
      newCategory: category,
      newName: name,
      newPrice: price,
    } = await request.json();
    await connectMongoDB();
    const update = await Pc_parts.findByIdAndUpdate(id, {category, name, price }, {new: true});
    console.log("updated");
    return NextResponse.json({ message: update });
    
  } catch (error) {
    console.log("there is error updating:", error)
  }
  
}




export async function GET(request, {params} ){
    const {id} = await params;
    await connectMongoDB();
    const Pc_parts = await Pc_parts.findOne({_id: id});
    return NextResponse.json({Pc_parts},{status:200});

}
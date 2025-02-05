import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongoDB";
import pc_parts from "../../../../models/pcParts";
import { ObjectId} from "mongodb";

// export async function PUT(request,params){
// try {
//     const  {id} =  params;
//     const { newCategory: category, newName: name, newPrice: price } = await request.json();
//     await connectMongoDB();
//     const ObjectId = new ObjectId(id);
//     await pc_parts.findOneAndUpdate(
//       { _id:  ObjectId},
//       { category, name, price }
//     );

//     return NextResponse.json(
//       { message: "update successfull" },
//       { status: 200 }
//     );

// } catch (error) {
//     console.log("error in updation",error);
//     return NextResponse.json( {message: "failed to update"},
//         {status:200})
       
//     }
// }

export async function PUT(request, context) {
  // Await the entire context object
  const awaitedContext = await context;
  // Now access params safely
  const id = awaitedContext.params.id;
  // Also, remember that request.json() is asynchronous
  const { newCategory: category ,newName: name, newPrice: price } = await request.json();
  await connectMongoDB();
  await pc_parts.findByIdAndUpdate(id, { category,name , price });
  return NextResponse.json({ message: "product updated" });
}

// export async function PUT(request, { params }) {
//   try {
//     const { id } =  await params;
//     const {
//       newCategory: category,
//       newName: name,
//       newPrice: price,
//     } = await request.json();

//     // Convert the id string to an ObjectId before using it in the query
//     const objectId = new ObjectId(id);

//     await connectMongoDB();

//     // Update the product in the database
//     const updatedProduct = await pc_parts.findOneAndUpdate(
//       { _id: objectId }, // Use the ObjectId here
//       { $set: { category, name, price } }, // Update the fields
//       { returnDocument: "after" } // Optionally return the updated document
//     );

//     if (!updatedProduct) {
//       return NextResponse.json(
//         { message: "Product not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: "Update successful" }, { status: 200 });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     return NextResponse.json(
//       { message: "Failed to update product" },
//       { status: 500 }
//     );
//   }
// }



export async function GET(request, {params} ){
    const {id} = await params;
    await connectMongoDB();
    const Pc_parts = await pc_parts.findOne({_id: id});
    return NextResponse.json({Pc_parts},{status:200});

}
// "use client";
// import React, { useState } from "react";
// import "../app/scss/PCBuilder2.css";
// import connectMongoDB from "@/lib/mongoDB";


// Define the structure for PC parts
// interface PCPart {
//   name: string;
//   price: number;
//   platform?: string; // Optional, as some parts may not have a platform
// }

// type PcPart {
//   category: string;
//   name: string;
//   price: number;
// };

// type PcPartResponse={
//   Pc_parts : PcPart[];
// }
// // Define the structure for selected parts
// interface SelectedParts {
//   [key: string]: PcPart | undefined; // The value can be a PCPart object or undefined
// }


// const PCBuilder = () => {
//   const [selectedPlatform, setSelectedPlatform] = useState<string>(""); // Line 14
//   const [selectedParts, setSelectedParts] = useState<SelectedParts>({}); // Line 15
//   const [currentStep, setCurrentStep] = useState<number>(0); // Line 16
//   const [totalPrice, setTotalPrice] = useState<number>(0); // Line 17

//   const apikey_web3 = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;



//   const pcParts : PcPartResponse = async () =>{
//     try{
//     await connectMongoDB();
//     const res = await fetch("http://localhost:3000/api",{
//       cache : "no-store",
//     });

//     if (!res.ok){
//       throw new Error("Failed to fetch topics")
//     }
//     return res.json();
// }
//    catch (error){
//     console.log("Error loading topics:", error)
//   }

  // const pcParts: { [category: string]: PCPart[] } = {
  //   // Line 23
  //   PROCESSOR: [
  //     { name: "Intel i5-12400", price: 16500 },
  //     { name: "Intel i7-12700", price: 29000 },
  //     { name: "AMD Ryzen 5 5600X", price: 18500 },
  //     { name: "AMD Ryzen 7 5800X", price: 33000 },
  //   ],
  //   MOTHERBOARD: [
  //     { name: "ASUS Prime B660", price: 9900 },
  //     { name: "MSI MAG B660", price: 10800 },
  //     { name: "ASUS TUF B550", price: 11200 },
  //     { name: "MSI MPG B550", price: 12100 },
  //   ],
  //   RAM: [
  //     { name: "8GB DDR4", price: 3200 },
  //     { name: "16GB DDR4", price: 6400 },
  //     { name: "32GB DDR4", price: 12500 },
  //   ],
  //   "GRAPHICS CARD": [
  //     { name: "NVIDIA RTX 3060", price: 34000 },
  //     { name: "AMD Radeon RX 6600", price: 29000 },
  //   ],
  //   PSU: [
  //     { name: "500W Bronze", price: 4200 },
  //     { name: "650W Gold", price: 7200 },
  //   ],
  //   STORAGE: [
  //     { name: "256GB NVMe SSD", price: 4500 },
  //     { name: "512GB NVMe SSD", price: 7500 },
  //     { name: "1TB HDD", price: 3500 },
  //     { name: "1TB SATA SSD", price: 7000 },
  //   ],
  // };

//   const categories: string[] = [
//     "PROCESSOR",
//     "MOTHERBOARD",
//     "RAM",
//     "GRAPHICS CARD",
//     "PSU",
//     "STORAGE",
//   ];

//   const updateSelection = (
//     category: string,
//     selectedOption: PCPart | undefined
//   ) => {
//     const updatedParts: SelectedParts = {
//       ...selectedParts,
//       [category]: selectedOption,
//     };
//     setSelectedParts(updatedParts);

//     const newTotal = Object.values(updatedParts).reduce(
//       (acc: number, part) => acc + (part?.price || 0),
//       0
//     );
//     setTotalPrice(newTotal);
//   };


//   const resetBuilder = () => {
//     setSelectedPlatform("");
//     setSelectedParts({});
//     setCurrentStep(0);
//     setTotalPrice(0);
//   };

//   const printReceipt = () => {
//     window.print();
//   };

//   return (
//     <>
//       <section
//         id="PCbuilder"
//         className="bg-gradient-to-b from-[#ffffff] to-[#D2DCFF] py-24"
//       >
//         <div className="pcbuild-container container">
//           <div className="max-w-[540px] mx-auto">
//             <h2 className="heading-color text-3xl text-center">
//               Assemble Your Dream Machine
//             </h2>
//             <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-6">
//               Pick your components, personalize your build, and send your
//               request. We’ll handle the rest.
//             </p>
//           </div>
//         </div>

//         <div className="contanier pc-builder ">
//           <form
//             action="https://api.web3forms.com/submit"
//             method="POST"
//             className="selection-form"
//           >
//             <input type="hidden" name="access_key" value={apikey_web3 || ""} />

//             {!selectedPlatform && (
//               <div className="form-group">
//                 <label>SELECT PLATFORM</label>
//                 <div className="platform-buttons">
//                   <button
//                     type="button"
//                     onClick={() => setSelectedPlatform("Intel")}
//                     className={`platform-button
//                     ${selectedPlatform === "Intel" ? "selected" : ""}`}
//                   >
//                     INTEL
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setSelectedPlatform("AMD")}
//                     className={`platform-button ${
//                       selectedPlatform === "AMD" ? "selected" : ""
//                     }`}
//                   >
//                     AMD
//                   </button>
//                 </div>

//                 {selectedPlatform && (
//                   <input
//                     type="hidden"
//                     name="platform"
//                     value={selectedPlatform}
//                   />
//                 )}
//               </div>
//             )}

//             {selectedPlatform && (
//               <>
//                 {categories.slice(0, currentStep + 1).map((category, index) => (
//                   <div key={index} className="form-group">
//                     <label>
//                       {category.charAt(0).toUpperCase() + category.slice(1)}
//                     </label>
//                     <select
//                       className="dropdown"
//                       name={category.toLowerCase()}
//                       onChange={(e) => {
//                         const selectedOption = pcParts[category].find(
//                           (opt) => opt.name === e.target.value
//                         );
//                         updateSelection(category, selectedOption);
//                       }}
//                       value={selectedParts[category]?.name || ""}
//                     >
//                       <option value="" disabled>
//                         Select{" "}
//                         {category.charAt(0).toUpperCase() + category.slice(1)}
//                       </option>
//                       {pcParts[category].map((item, index) => (
//                         <option key={index} value={item.name}>
//                           {item.name} - ₹{item.price}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 ))}

//                 {currentStep < categories.length - 1 && (
//                   <button
//                     type="button"
//                     className="plus-button"
//                     onClick={() => setCurrentStep(currentStep + 1)}
//                   >
//                   +
//                   </button>
//                 )}
//                 <div className="form-group">
//                   <label>Your Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     className="input-field"
//                     placeholder="Enter your name"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Your Phone Number</label>
//                   <input
//                     type="text"
//                     name="phone"
//                     className="input-field"
//                     placeholder="Enter your phone number"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Referral Code</label>
//                   <input
//                     type="text"
//                     name="Referral Code"
//                     className="input-field"
//                     placeholder="Referral Code"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Referred By</label>
//                   <input
//                     type="a"
//                     name="Referred by"
//                     className="input-field"
//                     placeholder="Referred by"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="message-box">Additional Information</label>

//                   <textarea
//                     id="message-box"
//                     name="Message"
//                     rows={3}
//                     cols={30}
//                     defaultValue="Please share any special requests or questions regarding your build."
//                     className="bg-blue-50"
//                   />
//                 </div>

//                 <div className="receipt">
//                   <h2 className="receipt-title">Selected Parts</h2>
//                   <ul className="receipt-list">
//                     {Object.keys(selectedParts).map((key) => (
//                       <li key={key} className="receipt-item">
//                         {key}: {selectedParts[key]?.name} (
//                         {`₹${selectedParts[key]?.price}`})
//                       </li>
//                     ))}
//                     <li className="receipt-item">
//                       Platform: {selectedPlatform}
//                     </li>
//                   </ul>
//                   <p className="total-price">Total Price: ₹{totalPrice}</p>
//                 </div>

//                 <div className="button-container">
//                   <button
//                     type="button"
//                     className="action-button reset"
//                     onClick={resetBuilder}
//                   >
//                     RESET
//                   </button>
//                   <button
//                     type="button"
//                     className="action-button print"
//                     onClick={printReceipt}
//                   >
//                     PRINT
//                   </button>

//                   <button type="submit" className="action-button send">
//                     SEND BUILD REQUEST
//                   </button>
//                 </div>
//               </>
//             )}
//           </form>
//         </div>
//       </section>
//     </>
//   );
// };

// export default PCBuilder;

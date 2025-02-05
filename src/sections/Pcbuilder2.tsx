"use client";
import React, { useState, useEffect } from "react";
import "../app/scss/PCBuilder2.css";
import connectMongoDB from "@/lib/mongoDB";


// Define the TypeScript types
type PcPart = {
  _id: string;
  category: string;
  name: string;
  price: number;
};

type PcPartsResponse = {
  Pc_parts: PcPart[];
};

// Define the structure for selected parts
interface SelectedParts {
  [key: string]: PcPart | undefined;
}


const PCBuilder2 = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [selectedParts, setSelectedParts] = useState<SelectedParts>({});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [pcParts, setPcParts] = useState<PcPartsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apikey_web3 = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  // Fetch data from MongoDB
  useEffect(() => {
    const fetchPcParts = async () => {
      try {
        await connectMongoDB();
        const res = await fetch("http://localhost:3000/admin/api", {
          cache: "no-store",
        });


        if (!res.ok) {
          throw new Error("Failed to fetch PC parts");
        }

        const data: PcPartsResponse = await res.json();
        setPcParts(data);
      } catch (error) {
        setError("Error loading PC parts");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPcParts();
  }, []);

  // Handle category selection updates
  const updateSelection = (
    category: string,
    selectedOption: PcPart | undefined
  ) => {
    const updatedParts: SelectedParts = {
      ...selectedParts,
      [category]: selectedOption,
    };
    setSelectedParts(updatedParts);

    // Calculate total price
    const newTotal = Object.values(updatedParts).reduce(
      (acc: number, part) => acc + (part?.price || 0),
      0
    );
    setTotalPrice(newTotal);
  };

  // Reset the selection
  const resetBuilder = () => {
    setSelectedPlatform("");
    setSelectedParts({});
    setCurrentStep(0);
    setTotalPrice(0);
  };

  const printReceipt = () => {
    window.print();
  };

  if (loading) return <p>Loading PC Parts...</p>;
  if (error) return <p>{error}</p>;
  if (!pcParts) return <p>No PC Parts available.</p>;

  // Extract unique categories from fetched data
  const categories = Array.from(
    new Set(pcParts.Pc_parts.map((part) => part.category))
  );

  return (
    <>
      <section
        id="PCbuilder"
        className="bg-gradient-to-b from-[#ffffff] to-[#D2DCFF] py-24"
      >
        <div className="pcbuild-container container">
          <h2 className="heading-color text-3xl text-center">
            Assemble Your Dream Machine
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-6">
            Pick your components, personalize your build, and send your request.
            We’ll handle the rest.
          </p>
        </div>

        <div className="container pc-builder">
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="selection-form"
          >
            <input type="hidden" name="access_key" value={apikey_web3 || ""} />

            {!selectedPlatform && (
              <div className="form-group">
                <label>SELECT PLATFORM</label>
                <div className="platform-buttons">
                  <button
                    type="button"
                    onClick={() => setSelectedPlatform("Intel")}
                    className={`platform-button ${
                      selectedPlatform === "Intel" ? "selected" : ""
                    }`}
                  >
                    INTEL
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlatform("AMD")}
                    className={`platform-button ${
                      selectedPlatform === "AMD" ? "selected" : ""
                    }`}
                  >
                    AMD
                  </button>
                </div>
              </div>
            )}

            {selectedPlatform && (
              <>
                {categories.slice(0, currentStep + 1).map((category, index) => (
                  <div key={index} className="form-group">
                    <label>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </label>
                    <select
                      className="dropdown"
                      name={category.toLowerCase()}
                      onChange={(e) => {
                        const selectedOption = pcParts.Pc_parts.find(
                          (opt) =>
                            opt.name === e.target.value &&
                            opt.category === category
                        );
                        updateSelection(category, selectedOption);
                      }}
                      value={selectedParts[category]?.name || ""}
                    >
                      <option value="" disabled>
                        Select {category}
                      </option>
                      {pcParts.Pc_parts.filter(
                        (part) => part.category === category
                      ).map((item, index) => (
                        <option key={index} value={item.name}>
                          {item.name} - ₹{item.price}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                {currentStep < categories.length - 1 && (
                  <button
                    type="button"
                    className="plus-button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    +
                  </button>
                )}

                <div className="receipt">
                  <h2 className="receipt-title">Selected Parts</h2>
                  <ul className="receipt-list">
                    {Object.keys(selectedParts).map((key) => (
                      <li key={key} className="receipt-item">
                        {key}: {selectedParts[key]?.name} (₹
                        {selectedParts[key]?.price})
                      </li>
                    ))}
                    <li className="receipt-item">
                      Platform: {selectedPlatform}
                    </li>
                  </ul>
                  <p className="total-price">Total Price: ₹{totalPrice}</p>
                </div>

                <div className="button-container">
                  <button
                    type="button"
                    className="action-button reset"
                    onClick={resetBuilder}
                  >
                    RESET
                  </button>
                  <button
                    type="button"
                    className="action-button print"
                    onClick={printReceipt}
                  >
                    PRINT
                  </button>
                  <button type="submit" className="action-button send">
                    SEND BUILD REQUEST
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default PCBuilder2;

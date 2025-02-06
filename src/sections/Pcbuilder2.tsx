"use client";
import React, { useState, useEffect } from "react";
import "../app/scss/PCBuilder2.css";
import connectMongoDB from "@/lib/mongoDB";
import LoadingLine from "@/components/Loading";
import { div } from "framer-motion/client";

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
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        await connectMongoDB();
        const res = await fetch(`${baseUrl}/admin/api`, {
          cache: "no-cache",
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

  if (loading)
    return (
      <div className="h-1">
        <LoadingLine />
      </div>
    );

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

  if (error) return <p>{error}</p>;
  if (!pcParts) return <p>No PC Parts available.</p>;

  // Extract unique categories from fetched data
  const categories = Array.from(
    new Set(pcParts.Pc_parts.map((part) => part.category))
  );

  return (
    <>
      <section>
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

                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input-field"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Your Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    className="input-field"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Referral Code</label>
                  <input
                    type="text"
                    name="Referral Code"
                    className="input-field"
                    placeholder="Referral Code"
                  />
                </div>
                <div className="form-group">
                  <label>Referred By</label>
                  <input
                    type="a"
                    name="Referred by"
                    className="input-field"
                    placeholder="Referred by"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message-box">Additional Information</label>

                  <textarea
                    id="message-box"
                    name="Message"
                    rows={3}
                    cols={30}
                    defaultValue="Please share any special requests or questions regarding your build."
                    className="bg-blue-50"
                  />
                </div>

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

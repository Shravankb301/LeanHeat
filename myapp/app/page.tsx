"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, ChangeEvent } from "react";

export default function Home() {
  const [website, setWebsite] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWebsite(e.target.value);
  };

  const handleButtonClick = async (): Promise<void> => {
    console.log("Button clicked"); // Debug log
    try {
        const response = await fetch("/api/save-website", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ website }),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const result = await response.json();
        console.log("API response:", result); // Debug log
  
        if (result.success) {
          alert("Website saved successfully!");
          setWebsite(""); // Clear the input field after saving
        } else {
          alert("Error saving website.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error saving website.");
      }
  };

  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-1.5 p-8 justify-between">
        <h1>Heatscope</h1>
        <Input
        type="url"
        placeholder="Enter your website" 
        value={website} 
        onChange={handleInputChange}></Input>

        <Button onClick={handleButtonClick}>Save Website</Button>
      </div>
    </div>
  );
}

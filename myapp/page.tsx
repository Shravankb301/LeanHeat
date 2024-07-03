"use client"

import { useState, ChangeEvent } from "react";

export default function Home() {
  const [website, setWebsite] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWebsite(e.target.value);
  };

  const handleButtonClick = (): void => {
    console.log("Button clicked"); // Debug log
  };

  return (
    <div>
      <div className="w-full max-w-sm items-center gap-1.5 p-8 justify-between">
        <h1>Heatscope</h1>
        <input
          type="url"
          placeholder="Enter your website"
          value={website}
          onChange={handleInputChange}
        />
        <button onClick={handleButtonClick}>
          Save Website
        </button>
      </div>
    </div>
  );
}

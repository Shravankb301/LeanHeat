"use client"

import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  const [website, setWebsite] = useState<string>("");
  const [websites, setWebsites] = useState<any[]>([]);

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
        fetchWebsites(); // Fetch updated list
      } else {
        alert("Error saving website.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving website.");
    }
  };

  const fetchWebsites = async (): Promise<void> => {
    try {
      const response = await fetch("/api/get-websites", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Fetched websites:", result); // Debug log

      if (result.success) {
        setWebsites(result.data);
      } else {
        alert("Error fetching websites.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching websites.");
    }
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  return (
    <div>
      <div className="w-full max-w-sm items-center gap-1.5 p-8 justify-between">
        <h1>Heatscope</h1>
        <Input
          type="url"
          placeholder="Enter your website"
          value={website}
          onChange={handleInputChange}
        />
        <Button variant="outline" onClick={handleButtonClick}>
          Save Website
        </Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow className="justify-center p-2">
              <TableHead>No</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {websites.map((site, index) => (
              <TableRow key={site.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{site.url}</TableCell>
                <TableCell>
                  <Button>See Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

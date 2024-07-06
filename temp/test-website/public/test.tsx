import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function isValidURL(string: string): boolean {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-zA-Z\\d_]*)?$",
    "i" // fragment locator
  );
  return !!pattern.test(string);
}

export default function Home() {
  const router = useRouter();  // Add useRouter
  const [website, setWebsite] = useState<string>("");
  const [websites, setWebsites] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWebsite(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleButtonClick();
    }
  };

  const handleButtonClick = async (): Promise<void> => {
    console.log("Button clicked"); // Debug log
    if (isValidURL(website)) {
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
          toast("Success");
          setWebsite(""); // Clear the input field after saving
          fetchWebsites(); // Fetch updated list
        } else {
          toast("Error");
        }
      } catch (error) {
        console.error("Error:", error);
        toast("Error");
      }
    } else {
      setError("Please enter a valid URL.");
      toast("Error invalid");
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
        toast("Error");
      }
    } catch (error) {
      console.error("Error:", error);
      toast("Error");
    }
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  const handleSeeDetails = (id: string): void => {
    router.push(`/details/${id}`);
  };

  return (
    <div>
      <div className="w-full max-w-sm items-center gap-1.5 p-8 justify-between">
        <h1 className="p-2">Heatscope</h1>
        <Input
          type="url"
          placeholder="Enter your website"
          value={website}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />

        <div className="p-4">
          <Toaster position="top-center" />
          <Button variant="outline" onClick={handleButtonClick}>
            Save Website
          </Button>
        </div>
      </div>
      <div className="p-8">
        <h2>Your Websites</h2>
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
              <TableRow key={site.id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{site.url}</TableCell>
                <TableCell>
                  <Button onClick={() => handleSeeDetails(site.id)}>See Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

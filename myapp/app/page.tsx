"use client"
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import dynamic from 'next/dynamic'
const formSchema = z.object({
  username: z.string().min(2).max(50),
})


export default function Home() {
  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-1.5 p-8 justify-between">
        <h1>Heatscope</h1>
        <Input type="url" placeholder="enter your website" />
        <Button variant="outline">Button</Button>
      </div>
      <div>
      
        <Table className="" >
          {/* <TableCaption></TableCaption> */}
          <TableHeader>
            <div className="justify-center p-2"> Your Entries </div>
            <TableRow>
              <TableHead className="">No</TableHead>  
              <TableHead>Website</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell className=""><Button>See Details</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table >
      </div>
    </div>
  );
}

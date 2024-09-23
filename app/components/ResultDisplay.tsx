"use client"

import { Image as ImageIcon, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResultDisplayProps {
  editedImage: string | null
}

export function ResultDisplay({ editedImage }: ResultDisplayProps) {
  if (!editedImage) {
    return null; // Do not render anything if there is no edited image
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Result</h2>
      <img src={editedImage} alt="Edited" className="max-w-full h-auto mx-auto mb-4 rounded" />
      <Button className="w-full bg-green-600 text-white hover:bg-green-700" disabled={!editedImage}>
        <Download className="mr-2 h-4 w-4" /> Download Result
      </Button>
    </div>
  )
}
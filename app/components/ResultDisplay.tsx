"use client"

import { Image as ImageIcon, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResultDisplayProps {
  editedImage: string | null
}

export default function ResultDisplay({ editedImage }: ResultDisplayProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Result</h2>
      {editedImage ? (
        <img src={editedImage} alt="Edited" className="max-w-full h-auto mx-auto mb-4 rounded" />
      ) : (
        <div className="border-2 border-gray-600 rounded-lg p-12 text-center text-gray-400">
          <ImageIcon className="mx-auto mb-4 h-12 w-12" />
          <p className="text-xl mb-2">Edited image will appear here</p>
          <p className="text-sm text-gray-500">Apply edits to see the result</p>
        </div>
      )}
      <Button className="w-full bg-green-600 text-white hover:bg-green-700" disabled={!editedImage}>
        <Download className="mr-2 h-4 w-4" /> Download Result
      </Button>
    </div>
  )
}
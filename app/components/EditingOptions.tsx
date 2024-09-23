"use client"

import { Zap, Eraser, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface EditingOptionsProps {
  onApplyEdits: () => void
}

export default function EditingOptions({ onApplyEdits }: EditingOptionsProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Editing Options</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="upscale" className="border-gray-600 text-blue-500" />
          <label htmlFor="upscale" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <Zap className="inline-block mr-2 h-4 w-4" /> Upscale Image
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="removeBackground" className="border-gray-600 text-blue-500" />
          <label htmlFor="removeBackground" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <Eraser className="inline-block mr-2 h-4 w-4" /> Remove Background
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="retouchFace" className="border-gray-600 text-blue-500" />
          <label htmlFor="retouchFace" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <Smile className="inline-block mr-2 h-4 w-4" /> Retouch Face
          </label>
        </div>
      </div>
      <Button className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700" onClick={onApplyEdits}>Apply Edits</Button>
    </div>
  )
}
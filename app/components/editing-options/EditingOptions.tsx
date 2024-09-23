"use client"

import { Button } from "../ui/button"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar"
import { Download, ImageOff, Scaling } from "lucide-react"

interface EditingOptionsProps {
  onUpscale: () => void
  onDownload: () => void
  editedImage: string | null
}

export function EditingOptions({ onUpscale, onDownload, editedImage }: EditingOptionsProps) {
  return (
    <div className="sticky bottom-6 center-0 bg-white rounded-lg shadow-lg">
      <Menubar className="py-6">
        <MenubarMenu>
          <MenubarTrigger className="text-black hover:text-gray-700">
            <Scaling className="mr-2 h-4 w-4" /> Upscale
          </MenubarTrigger>
          <MenubarContent className="bg-white text-black">
            <MenubarItem onSelect={onUpscale} className="text-black">
              Upscale
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-black hover:text-gray-700">
            <ImageOff className="mr-2 h-4 w-4" /> Remove Background
          </MenubarTrigger>
          <MenubarContent className="bg-white text-black">
            <MenubarItem onSelect={() => console.log('Remove background selected')} className="text-black">
              Remove Background
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        {editedImage && (
            <Button onClick={onDownload} className="text-white bg-purple-500 hover:bg-purple-600 py-2">
              <Download className="mr-2 h-4 w-4" /> Download Image
            </Button>
        )}
      </Menubar>
    </div>
  )
}
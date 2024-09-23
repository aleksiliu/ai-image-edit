"use client"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar"
import { Download, Upload } from "lucide-react"

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
            <Upload className="mr-2 h-4 w-4" /> Upscale
          </MenubarTrigger>
          <MenubarContent className="bg-white text-black">
            <MenubarItem onSelect={onUpscale} className="text-black">
              Upscale
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-black hover:text-gray-700">
            <Upload className="mr-2 h-4 w-4" /> Remove Background
          </MenubarTrigger>
          <MenubarContent className="bg-white text-black">
            <MenubarItem onSelect={() => console.log('Remove background selected')} className="text-black">
              Remove Background
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        {editedImage && (
          <MenubarMenu>
            <MenubarTrigger onClick={onDownload} className="text-white bg-purple-500 py-2">
              <Download className="mr-2 h-4 w-4" /> Download Image
            </MenubarTrigger>
          </MenubarMenu>
        )}
      </Menubar>
    </div>
  )
}
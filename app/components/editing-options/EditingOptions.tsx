"use client"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar"
import { Upload } from "lucide-react"

interface EditingOptionsProps {
  onApplyEdits: () => void
}
export function EditingOptions({ onApplyEdits }: EditingOptionsProps) {
  return (
    <div className="sticky bottom-6 center-0 bg-white rounded-lg shadow-lg">
      <Menubar className="py-6">
        <MenubarMenu>
          <MenubarTrigger className="text-black hover:text-gray-700">
            <Upload className="mr-2 h-4 w-4" /> Upscale
          </MenubarTrigger>
          <MenubarContent className="bg-white text-black">
            <MenubarItem onSelect={() => console.log('Upscale selected')} className="text-black">
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
      </Menubar>
    </div>
  )
}
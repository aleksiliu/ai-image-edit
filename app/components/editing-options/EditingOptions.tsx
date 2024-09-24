"use client"

import { Button } from "../ui/button"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar"
import { Download, ImageOff, Scaling, Loader2 } from "lucide-react"

interface EditingOptionsProps {
  onUpscale: () => void
  onRemoveBackground: () => void
  onDownload: () => void
  editedImage: string | null
  isUpscaling: boolean
  isRemovingBackground: boolean
}

export function EditingOptions({ 
  onUpscale, 
  onDownload, 
  editedImage, 
  onRemoveBackground, 
  isUpscaling, 
  isRemovingBackground 
}: EditingOptionsProps) {
  return (
    <div className="sticky bottom-6 center-0 bg-white rounded-lg shadow-lg">
      <Menubar className="py-6">
        <MenubarMenu>
          <MenubarTrigger className="text-black hover:text-gray-700" disabled={isUpscaling}>
            {isUpscaling ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Upscaling...</span>
              </>
            ) : (
              <>
                <Scaling className="mr-2 h-4 w-4" />
                Upscale
              </>
            )}
          </MenubarTrigger>
          <MenubarContent className="bg-white text-black">
            <MenubarItem onSelect={onUpscale} className="text-black" disabled={isUpscaling}>
              4x Upscale 
            </MenubarItem>
            <MenubarItem className="text-black" disabled={isUpscaling}>
              2x Upscale 
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-black hover:text-gray-700" disabled={isRemovingBackground}>
            {isRemovingBackground ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Removing Background...</span>
              </>
            ) : (
              <>
                <ImageOff className="mr-2 h-4 w-4" />
                Remove Background
              </>
            )}
          </MenubarTrigger>
          <MenubarContent className="bg-white text-black">
          <MenubarItem onSelect={onRemoveBackground} className="text-black" disabled={isRemovingBackground}>
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
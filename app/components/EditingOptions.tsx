"use client"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"

interface EditingOptionsProps {
  onApplyEdits: () => void
}

export function EditingOptions({ onApplyEdits }: EditingOptionsProps) {
  return (
    <div className="sticky bottom-4 center-0 bg-gray-800 p-4 rounded-lg shadow-lg z-20">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Editing Options</h2>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="w-full bg-gray-700 text-white border-gray-600 hover:bg-gray-600">
            Edit Options
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={onApplyEdits}>Apply Edits</MenubarItem>
            <MenubarSeparator />
            {/* Add more menu items for different editing options */}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}
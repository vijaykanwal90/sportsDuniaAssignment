'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react'
import { useApiDataContext } from '@/app/Context/Store'

export function Filter() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<'authors' | 'date' | null>(null)
  const { setData, originalData } = useApiDataContext()
  
  // Get the list of unique authors
  const authorsList = [...new Set(originalData.map((item) => item.author))];
  
  const getFormattedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get the list of unique formatted dates
  const uniqueDates = originalData.map((item) => getFormattedDate(item.publishedAt));
  const dates = [...new Set(uniqueDates)];

  const handleItemSelect = (item: string, filter: 'authors' | 'date') => {
    setSelectedItem(item)
    setSelectedFilter(filter)
    const filteredData = originalData.filter((res) => {
      if (filter === 'authors') {
        return res.author === item;
      } else if (filter === 'date') {
        return getFormattedDate(res.publishedAt) === item;
      }
      return true;
    });
    setData(filteredData)
  }

  return (
    <div className="relative flex flex-col items-start space-y-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Filter <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onSelect={() => {
            setSelectedItem(null);
            setSelectedFilter(null);
            setData([]);
          }}>
            Clear Filter
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Authors</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent 
                className="max-h-60 overflow-y-auto"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent'
                }}
              >
                {authorsList.map((author, index) => (
                  <DropdownMenuItem key={index} onSelect={() => handleItemSelect(author, 'authors')}>
                    {author}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Date</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent 
                className="max-h-60 overflow-y-auto"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent'
                }}
              >
                {dates.map((date, index) => (
                  <DropdownMenuItem key={index} onSelect={() => handleItemSelect(date, 'date')}>
                    {date}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedItem && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Selected {selectedFilter}:</h4>
          <p className="text-sm bg-white shadow-lg rounded-md p-2">{selectedItem}</p>
        </div>
      )}
    </div>
  )
}


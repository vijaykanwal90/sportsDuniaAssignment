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
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react'
import { useApiDataContext } from '@/app/Context/Store'

export function Filter() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<'authors' | 'date' | null>(null)
  // const [filteredData , setFilteredData] = useState()
  const {setData , originalData} = useApiDataContext()
  
  // Get the list of unique authors
  const authorsList = [...new Set(originalData.map((item) => item.name))]; // Ensure authors are unique
  
  const getFormattedDate = (dateStr:string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  // console.log(originalData)
  // Get the list of unique formatted dates
  const uniqueDates = originalData.map((item) => getFormattedDate(item.date)); // Apply formatting to each date
  const dates = [...new Set(uniqueDates)]; // Remove duplicates by using a Set
  
  // console.log(data)

  const handleItemSelect = (item: string, filter: 'authors' | 'date') => {
    setSelectedItem(item)
    setSelectedFilter(filter)
    const filteredData = originalData.filter((res) => {
      if (filter === 'authors') {
        return res.name === item; // Filter by selected author
      } else if (filter === 'date') {
        const formattedDate = getFormattedDate(item);
        return getFormattedDate(res.date) === formattedDate; // Filter by selected date
      }
      return true; // Return all data if no filter is applied
    });
    // console.log(filteredData)
    // Update the context with the filtered data
    // setFilteredData(filteredData);
    // setData(filterData(item,filter))
    // console.log(data)
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

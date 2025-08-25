import { useState, useEffect, useRef } from 'react'

export interface DropDownOption {
  id: number
  value: string
  item: string
  icon: React.ReactNode
}

export const useDropDown = (initialOptions: DropDownOption[]) => {
  const [options, setOptions] = useState<DropDownOption[]>(initialOptions)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<DropDownOption[]>([])
  const [inputValue, setInputValue] = useState('')
  const [nextId, setNextId] = useState(initialOptions.length + 1)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const toggleDropdown = () => setIsOpen(!isOpen)

  const addNewOption = (itemName: string, icon: React.ReactNode) => {
    if (itemName.trim()) {
      const newOption: DropDownOption = {
        id: nextId,
        value: itemName,
        item: itemName,
        icon
      }
      
      setOptions(prev => [...prev, newOption])
      setNextId(prev => prev + 1)
      setInputValue('')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>, icon: React.ReactNode) => {
    if (e.key === 'Enter') {
      addNewOption(inputValue, icon)
    }
  }

  const toggleOptionSelection = (option: DropDownOption) => {
    setSelectedOptions(prev => {
      const isSelected = prev.some(selected => selected.id === option.id)
      if (isSelected) {
        return prev.filter(selected => selected.id !== option.id)
      } else {
        return [...prev, option]
      }
    })
  }

  const isOptionSelected = (option: DropDownOption) => {
    return selectedOptions.some(selected => selected.id === option.id)
  }

  return {
    // State
    options,
    isOpen,
    selectedOptions,
    inputValue,
    
    // Actions
    toggleDropdown,
    addNewOption,
    handleInputChange,
    handleEnterPress,
    toggleOptionSelection,
    isOptionSelected,
    
    // Utility
    setIsOpen,
    dropdownRef
  }
}

import React from 'react'

// Hooks
import { useDropDown } from '../../customHooks/dropDown/useDropDown'

// Icons
import { GraduationCap, Microscope, Palette, Volleyball, Gamepad2, Cross, ChevronDown, ChevronUp, Check, Plus } from 'lucide-react'

// Styles
import './SimpleDropDown.scss'

const initialOptions = [
  {id: 1, value:'Education', item:'Education', icon: <GraduationCap size={16} />},
  {id: 2, value:'Science', item:'Science', icon: <Microscope size={16} />},
  {id: 3, value:'Art', item:'Art', icon: <Palette size={16} />},
  {id: 4, value:'Sport', item:'Sport', icon: <Volleyball size={16} />},
  {id: 5, value:'Games', item:'Games', icon: <Gamepad2 size={16} />},
  {id: 6, value:'Health', item:'Health', icon: <Cross size={16} />},
]

const SimpleDropDown = () => {
  const {
    options,
    isOpen,
    selectedOptions,
    inputValue,
    toggleDropdown,
    handleInputChange,
    handleEnterPress,
    toggleOptionSelection,
    isOptionSelected,
    setIsOpen,
    dropdownRef
  } = useDropDown(initialOptions)

  // Default icon for new items
  const defaultIcon = <Plus size={16} />

  return (
    <div>
      {/* Custom Dropdown */}
      <div className="dropdown-container" ref={dropdownRef}>
        <button
          className="dropdown-button"
          onClick={toggleDropdown}
        >
          <div className={`dropDown ${isOpen ? 'open' : ''}`}>
            <span>
              {selectedOptions.length > 0 
                ? `${selectedOptions.length} selected` 
                : 'Select options...'
              }
            </span>
            {isOpen ? <ChevronUp size={16} className="chevron-icon" /> : <ChevronDown size={16} className="chevron-icon" />}
          </div>
        </button>
        
        {isOpen && (
          <div className="dropdown-menu">
            <input 
              type="text" 
              value={inputValue} 
              onChange={handleInputChange}
              onKeyDown={(e) => handleEnterPress(e, defaultIcon)}
              placeholder="Add Your Item By Enter"
              className="dropdown-search-input"
            />
            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => toggleOptionSelection(option)}
                className={`dropdown-option ${isOptionSelected(option) ? 'selected' : ''}`}
              >
                <div className="dropdown-option-content">
                  {option.icon}
                  <span>{option.item}</span>
                </div>
                {isOptionSelected(option) && <Check size={16} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SimpleDropDown
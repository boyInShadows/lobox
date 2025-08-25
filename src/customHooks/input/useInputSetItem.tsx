import React, { useState,useEffect } from 'react'

export const useInputSetItem = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };



    return { inputValue, handleInputChange };
};
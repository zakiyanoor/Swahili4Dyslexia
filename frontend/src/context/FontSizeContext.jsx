import React, { createContext, useContext, useState } from 'react';

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState('medium');

    const changeFontSize = (size) => {
        setFontSize(size);
        document.documentElement.style.setProperty('--font-size-scale', {
            small: '0.875',
            medium: '1',
            large: '1.125'
        }[size]);
    };

    return (
        <FontSizeContext.Provider value={{ fontSize, changeFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};

export const useFontSize = () => useContext(FontSizeContext);

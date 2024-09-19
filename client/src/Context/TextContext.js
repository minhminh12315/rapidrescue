import React, { createContext } from 'react';
const TextContext = createContext({
    texts: [],
    setTexts: () => {}
  });
export default TextContext;
import React, { useEffect } from 'react';
import styled, { createFontHeadStyle } from 'styled-components';

// Create a global style to apply the font
const FontHeadStyle = createFontHeadStyle`
  body {
    font-family: 'Chakra Petch', sans-serif;
  }
`;

// Your component
const FontStyle = () => {
  // Dynamically add the link to Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Chakra+Petch&display=swap"';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Cleanup: Remove the link when the component unmounts
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div>
      <FontHeadStyle />
      <p>This text uses the Google Font.</p>
    </div>
  );
};

export default FontStyle;
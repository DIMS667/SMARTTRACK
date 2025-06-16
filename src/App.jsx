// App.jsx - Version adaptée pour SMARTTRACK
import React from 'react';
import CustomizerProvider from '@/context/CustomizerContext';
import ThemeProvider from '@/context/ThemeContext';
import MainLayout from '@/components/layout/Layout/MainLayout';

function App() {
  return (
    <ThemeProvider>
      <CustomizerProvider>
        <MainLayout />
      </CustomizerProvider>
    </ThemeProvider>
  );
}

export default App;
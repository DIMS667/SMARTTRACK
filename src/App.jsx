// App.jsx - Version mise à jour avec FluxProvider
import React from 'react';
import CustomizerProvider from '@/context/CustomizerContext';
import ThemeProvider from '@/context/ThemeContext';
import RoleProvider from '@/context/RoleContext';
import TeamsProvider from '@/context/TeamsContext';
import FluxProvider from '@/context/FluxContext'; // ✅ Nouveau import
import MainLayout from '@/components/layout/Layout/MainLayout';

function App() {
  return (
    <ThemeProvider>
      <CustomizerProvider>
        <RoleProvider>
          <TeamsProvider>
            <FluxProvider>
              <MainLayout />
            </FluxProvider>
          </TeamsProvider>
        </RoleProvider>
      </CustomizerProvider>
    </ThemeProvider>
  );
}

export default App;
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout; 
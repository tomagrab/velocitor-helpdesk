'use client';
import { ChevronsRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NavbarSidebarToggle() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkScreenWidthAndSetSidebar = () => {
      const screenWidth = window.innerWidth;
      const sidebarToggle = document.getElementById(
        'sidebar-toggle',
      ) as HTMLInputElement;

      // Check if the sidebar should be open or closed based on screen width
      if (screenWidth <= 768 && sidebarOpen) {
        setSidebarOpen(false);
        sidebarToggle.checked = false;
      } else if (screenWidth > 768 && !sidebarOpen) {
        setSidebarOpen(true);
        sidebarToggle.checked = true;
      }
    };

    // Initial check when the component mounts
    checkScreenWidthAndSetSidebar();

    // Add event listener for screen resize
    window.addEventListener('resize', checkScreenWidthAndSetSidebar);

    // Add event listener for the sidebar toggle
    const sidebarToggle = document.getElementById(
      'sidebar-toggle',
    ) as HTMLInputElement;
    sidebarToggle.addEventListener('change', () => {
      setSidebarOpen(!sidebarToggle.checked);
    });

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('resize', checkScreenWidthAndSetSidebar);
      if (sidebarToggle) {
        sidebarToggle.removeEventListener(
          'change',
          checkScreenWidthAndSetSidebar,
        );
      }
    };
  }, [sidebarOpen]); // Add sidebarOpen as a dependency

  return (
    <label htmlFor="sidebar-toggle" className="cursor-pointer ">
      <ChevronsRight
        className="sidebar-toggle-btn text-velgray transition-transform duration-300 ease-out"
        size={24}
      />
    </label>
  );
}

import { Outlet } from 'react-router-dom';

/**
 * @layout RootLayout
 * @summary Root layout wrapper for all pages
 */
export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
};

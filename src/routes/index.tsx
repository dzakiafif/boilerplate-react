import Homepage from 'pages/homepage';
import { useRoutes } from 'react-router-dom';

export function AppRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <Homepage />,
    },
  ]);
}

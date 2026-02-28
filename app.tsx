import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ParkingProvider } from './context/parkingcontext.tsx';
import { ThemeProvider } from './context/themecontext.tsx';

function App() {
  return (
    <ThemeProvider>
      <ParkingProvider>
        <RouterProvider router={router} />
      </ParkingProvider>
    </ThemeProvider>
  );
}

export default App;

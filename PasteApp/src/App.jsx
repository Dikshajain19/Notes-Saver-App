import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Pastes from './components/Pastes';
import ViewPastes from './components/ViewPastes';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <NavBar />
        <Home />
      </div>
    ),
  },
  {
    path: '/pastes',
    element: (
      <div>
        <NavBar />
        <Pastes />
      </div>
    ),
  },
  {
    path: '/pastes/:id',
    element: (
      <div>
        <NavBar />
        <ViewPastes />
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Species from '../pages/Species';
import CharacterDetail from '../pages/CharacterDetail';
import ErrorPage from '../pages/ErrorPage';

function AppRoutes() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/species" element={<Species />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRoutes;

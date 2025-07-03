import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Favorites from '../pages/Favorites/Favorites';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favoritos" element={<Favorites />} />
    </Routes>
  );
};

export default AppRoutes;

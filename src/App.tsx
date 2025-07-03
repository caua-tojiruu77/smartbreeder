import { BrowserRouter } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Layout/Header";

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;

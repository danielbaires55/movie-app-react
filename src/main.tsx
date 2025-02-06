// Importa React e altre dipendenze principali
import { StrictMode } from "react"; // StrictMode aiuta a individuare problemi nel codice React
import { createRoot } from "react-dom/client"; // Metodo moderno per rendere un'app React
import App from "./App.tsx"; // Importa il componente principale dell'app
import { Provider } from "./components/ui/provider.tsx"; // Importa il provider globale dell'app
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Fix: Usa "react-router-dom" invece di "react-router"
import DetailsPage from "./components/DetailsPage"; // Importa la pagina dei dettagli
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Importa React Query

// Crea un'istanza di QueryClient
const queryClient = new QueryClient();

// Monta l'applicazione React nella DOM
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider>
          <Routes>
            <Route index element={<App />} />
            <Route path="/details/:media_type/:id" element={<DetailsPage />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

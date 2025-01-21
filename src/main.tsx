// Importa React e altre dipendenze principali
import { StrictMode } from 'react'; // StrictMode è utilizzato per evidenziare potenziali problemi nel codice React
import { createRoot } from 'react-dom/client'; // createRoot è il nuovo metodo per rendere un'app React nella DOM
import App from './App.tsx'; // Importa il componente principale dell'applicazione
import { Provider } from './components/ui/provider.tsx'; // Importa un provider.
import { BrowserRouter, Routes, Route } from "react-router"; // Importa i componenti di routing per gestire la navigazione
import DetailsPage from './components/DetailsPage'; // Importa il componente della pagina dei dettagli

// Monta l'applicazione React nella DOM
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* BrowserRouter gestisce la logica di navigazione basata su URL */}
    <BrowserRouter>
      <Provider>
        {/* Routes definisce le rotte dell'applicazione */}
        <Routes>
          {/* Rotta principale che carica il componente App */}
          <Route index element={<App />} />
          {/* Rotta dinamica per la pagina dei dettagli, con parametri media_type e id */}
          <Route path="/details/:media_type/:id" element={<DetailsPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from './components/ui/provider.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
//import { Details } from "./components/Details";
import DetailsPage from './components/DetailsPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Provider>
      <Routes>
        <Route index element={<App />} />
        <Route path="/details/:media_type/:id" element={<DetailsPage />} />
      </Routes>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
) 
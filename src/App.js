import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Launcher from './pages/Launcher.js';
import ImportPage from './pages/Import.js';
import ExportPage from './pages/Export.js';
import ManifestsPage from './pages/Manifests.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Launcher />} />
        <Route path="/import" element={<ImportPage />} />
        <Route path="/export" element={<ExportPage />} />
        <Route path="/manifests" element={<ManifestsPage />} />
      </Routes>      
    </div>
  );
}

export default App;

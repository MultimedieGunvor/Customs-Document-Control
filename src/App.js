import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Launcher from './pages/Launcher.js';
import ManifestPage from './pages/Manifest.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Launcher />} />
        <Route path="/manifest" element={<ManifestPage />} />
      </Routes>      
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import LandingHero from './components/LandingHero'; 
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingHero />} />
    </Routes>
  );
}

export default App;

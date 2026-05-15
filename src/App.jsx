import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import './styles/theme.css';

function App() {
  return (
    <>
      <Navbar />
      <main className="app-container">
        <AnimatePresence mode="wait">
          <AppRoutes />
        </AnimatePresence>
      </main>
    </>
  );
}

export default App

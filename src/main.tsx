import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Falha ao encontrar o elemento root no documento.');
}

createRoot(rootElement).render(<App />);
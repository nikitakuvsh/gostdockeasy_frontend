import './main.css';
import Form from './components/Form/Form';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Statistic from './components/Statistic/Statistic';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/stats" element={<Statistic />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

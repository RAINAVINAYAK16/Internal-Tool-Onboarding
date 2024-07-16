import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './components/homepage';
import MaterialsBot from './components/materialsbot';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/materialsbot" element={<MaterialsBot />} />
      </Routes>
    </Router>
  );
};

export default App;

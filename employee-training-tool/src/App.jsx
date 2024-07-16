import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './components/homepage';
import MaterialsBot from './components/materialsbot';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/materialsbot" element={<MaterialsBot />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;

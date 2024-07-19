import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './components/homepage';
import MaterialsBot from './components/materialsbot';
import PerformanceAssessments from './components/performanceassessments';
import ReviewNotificationPage from './components/reviews';
import TestPage from './components/testpage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/materialsbot" element={< MaterialsBot />} />
                <Route path="/performanceassessments" element={< PerformanceAssessments />} />
                <Route path="/take-test" element={< TestPage />} />
                <Route path="/reviews" element={< ReviewNotificationPage />} />
            </Routes>
        </Router>
    );
};

export default App;



// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import HomePage from './components/homepage';
// import MaterialsBot from './components/materialsbot';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/materialsbot" element={<MaterialsBot />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

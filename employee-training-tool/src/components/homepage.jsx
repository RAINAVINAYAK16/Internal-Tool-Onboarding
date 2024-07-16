import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';

const HomePage = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculateTrianglePositions = () => {
    const smallerDimension = Math.min(windowSize.width, windowSize.height - 80);
    const triangleSize = smallerDimension * 0.8;
    const centerX = windowSize.width / 2;
    const centerY = (windowSize.height - 80) / 2;
    const leftOffset = windowSize.width * 0.05;

    return {
      top: {
        left: `${centerX - leftOffset}px`,
        top: `${centerY - (Math.sqrt(3) / 3) * triangleSize * 0.5}px`,
      },
      bottomLeft: {
        left: `${centerX - triangleSize * 0.5 * 0.5 - leftOffset}px`,
        top: `${centerY + (Math.sqrt(3) / 6) * triangleSize * 0.5}px`,
      },
      bottomRight: {
        left: `${centerX + triangleSize * 0.5 * 0.5 - leftOffset}px`,
        top: `${centerY + (Math.sqrt(3) / 6) * triangleSize * 0.5}px`,
      },
    };
  };

  const positions = calculateTrianglePositions();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500">
      <header className="bg-white shadow-md w-full">
        <div className="container mx-auto flex flex-col items-center justify-between header-container">
          <div className="flex items-center mb-4 logo-title">
            <img src="/path/to/logo.png" alt="Logo" className="logo" />
            <h1 className="ml-4 font-bold text-gray-800 font-orbitron title">IOCL Internal Onboarding</h1>
          </div>
          <nav className="flex flex-wrap justify-center space-x-4 navigation">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/training" className="nav-link">Training</Link>
            <Link to="/assessment" className="nav-link">Assessment</Link>
            <Link to="/performances" className="nav-link">Performances</Link>
            <Link to="/help" className="nav-link">Help</Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center relative overflow-hidden">
        <div className="triangle-container absolute inset-0">
          {['top', 'bottomLeft', 'bottomRight'].map((position, index) => (
            <motion.div
              key={position}
              className="triangle-item absolute"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                left: positions[position].left,
                top: positions[position].top,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Link to={index === 0 ? "/materialsbot" : "#"}>
                <div className="flex flex-col items-center bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out triangle-content">
                  <div className={`bg-${index === 0 ? 'blue' : index === 1 ? 'green' : 'red'}-500 rounded-full flex items-center justify-center icon-container`}>
                    <img src={`/path/to/${index === 0 ? 'chatbot' : index === 1 ? 'assessment' : 'performance'}-icon.png`} alt={index === 0 ? "Chatbot" : index === 1 ? "Assessments" : "Performance Reviews"} className="icon" />
                  </div>
                  <p className="text-gray-700 font-semibold font-orbitron text-center icon-text">
                    {index === 0 ? "Training Manuals Chatbot" : index === 1 ? "Upcoming Assessments" : "Performance Reviews"}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
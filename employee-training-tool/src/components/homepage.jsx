import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Assessments from '../assets/Assessments.svg';
import Chatbot from '../assets/Chatbot.jpg';
import IndianOilLogo from '../assets/IndianOilLogo.png';
import Review from '../assets/Review.png';
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
    <div className="min-h-screen flex flex-col bg-[#d0eaff]">
      <header className="bg-[#040720] shadow-md w-full">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <img src={IndianOilLogo} alt="Logo" className="logo object-contain w-16 h-16 sm:w-20 sm:h-20" />
              <h4 className="ml-2 font-bold text-white font-orbitron text-sm sm:text-base md:text-lg lg:text-xl">
                IOCL Internal Onboarding
              </h4>
            </div>
            <nav className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
              <Link to="/" className="nav-link text-sm sm:text-base text-white hover:text-yellow-200 transition-colors duration-200">Home</Link>
              <Link to="/training" className="nav-link text-sm sm:text-base text-white hover:text-yellow-200 transition-colors duration-200">Training</Link>
              <Link to="/assessment" className="nav-link text-sm sm:text-base text-white hover:text-yellow-200 transition-colors duration-200">Assessment</Link>
              <Link to="/performances" className="nav-link text-sm sm:text-base text-white hover:text-yellow-200 transition-colors duration-200">Performances</Link>
              <Link to="/help" className="nav-link text-sm sm:text-base text-white hover:text-yellow-200 transition-colors duration-200">Help</Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col">
        <div className="relative h-screen">
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
                      <img src={`${index === 0 ? Chatbot : index === 1 ? Assessments : Review}`} alt={index === 0 ? "Chatbot" : index === 1 ? "Assessments" : "Performance Reviews"} className="icon" />
                    </div>
                    <p className="text-gray-700 font-semibold font-orbitron text-center icon-text">
                      {index === 0 ? "Training Chatbot" : index === 1 ? "Upcoming Tests" : "Your HR Reviews"}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Welcome to IOCL Internal Onboarding</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Latest News</h3>
                <p>Stay updated with the latest announcements and news from IOCL.</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Training Schedule</h3>
                <p>View upcoming training sessions and workshops.</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Employee Resources</h3>
                <p>Access important documents and resources for your onboarding process.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
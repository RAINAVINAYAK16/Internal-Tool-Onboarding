import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import Assessments from '../assets/Assessments.svg';
import Chatbot from '../assets/Chatbot.jpg';
import IndianOilLogo from '../assets/IndianOilLogo.png';
import IOCL_Building from '../assets/IOCL_Building.avif';
import IOCL_Petrol_Pump from '../assets/IOCL_Petrol_Pump.jpg';
import IOCL_Refineries from '../assets/IOCL_Refineries.avif';
import Review from '../assets/Review.png';
import Dropdown from './dropdown';
import './homepage.css';

const HomePage = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const homeRef = useRef(null);
  const trainingRef = useRef(null);
  const achievementsRef = useRef(null);
  const helpRef = useRef(null);

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

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  const backgroundImages = [IOCL_Building, IOCL_Petrol_Pump, IOCL_Refineries];
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const achievements = [
    "Awarded Best PSU in 2023",
    "IndianOil bagged the 7th CII Industrial Intellectual Property Award 2021",
    "Paradip Refinery was adjudged Winner in Gold Category for the prestigious Kalinga Safety Excellence Award-2020 in the National Safety Conclave, Bhubaneswar",
    "IndianOil bagged 19th FICCI CSR Award for ‘Madhur Muskaan’ initiative",
    "The ePIC project won Govt of India’s 24th National Awards for e-Governance under “Excellence in Adopting Emerging Technologies",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#d0eaff]" ref={homeRef}>
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Background ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${currentBackgroundIndex === index ? 'opacity-100' : 'opacity-0'}`}
            style={{ zIndex: index === currentBackgroundIndex ? 1 : 0 }}
            initial={{ opacity: index === 0 ? 1 : 0 }}
            animate={{ opacity: currentBackgroundIndex === index ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
        ))}
      </div>
      <header className="bg-[#0D0B49] shadow-md w-full relative z-20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <img src={IndianOilLogo} alt="Logo" className="logo object-contain w-16 h-16 sm:w-20 sm:h-20" />
              <h1 className="ml-2 font-bold text-white font-orbitron text-sm sm:text-base md:text-lg lg:text-xl">
                IOCL Internal Onboarding
              </h1>
            </div>
            <nav className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
              <button onClick = {() => scrollToRef(homeRef)} className="nav-link text-sm sm:text-base text-white hover:text-orange-400 transition-colors duration-200">Home</button>
              <button onClick = {() => scrollToRef(trainingRef)} className="nav-link text-sm sm:text-base text-white hover:text-orange-400 transition-colors duration-200">Training</button>
              <button onClick = {() => scrollToRef(achievementsRef)} className="nav-link text-sm sm:text-base text-white hover:text-orange-400 transition-colors duration-200">Achievements</button>
              <button onClick = {() => scrollToRef(trainingRef)} className="nav-link text-sm sm:text-base text-white hover:text-orange-400 transition-colors duration-200">Performances</button>
              <button onClick = {() => scrollToRef(helpRef)} className="nav-link text-sm sm:text-base text-white hover:text-orange-400 transition-colors duration-200">Help</button>
              <button onClick = {() => scrollToRef(trainingRef)} className="nav-link text-sm sm:text-base text-white hover:text-orange-400 transition-colors duration-200">LogOut</button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col mt-n-2">
        <div className="relative h-screen">
          <div className="triangle-container absolute inset-0 flex" ref={trainingRef}>
            <Dropdown />
            
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
                <Link to={index === 0 ? "/materialsbot" : index === 1 ? "/performanceassessments" : "/reviews"}>
                  <div className="flex flex-col items-center bg-[#89CFF0] rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out triangle-content relative z-40">
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
        <div className="bg-[#d0eaff] py-4 mt-n-2" ref={achievementsRef}>
          <div className="container mx-auto px-4">
            <div className="achievements-section border-4 border-orange-600 bg-gray-300 p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-4xl font-bold mb-4 text-center text-gray-800">Achievements</h3>
              <div className="grid grid-cols-1 gap-4" ref={ref}>
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ delay: index * 0.7 }}
                    className="p-4 bg-[#F28C28] rounded-lg shadow-md"
                  >
                    <p className="text-lg font-orbitron text-center">{achievement}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="help-section border-4 border-orange-600 bg-gray-300 p-6 rounded-lg shadow-lg mb-6 mt-20">
              <h3 className="text-4xl font-bold mb-4 text-center text-gray-800">Help</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={helpRef}>
              <motion.div
                className="hover-item"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link to="https://x.com/IndianOilcl?ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwterm%5Escreen-name%3AindianOilcl%7Ctwcon%5Es2" className="block">
                  <div className="bg-[#FFE5B4] p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Latest News</h3>
                    <p>Stay updated with the latest announcements and news from IOCL.</p>
                  </div>
                </Link>
              </motion.div>
              <motion.div
                className="hover-item"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link to="https://iocl.com/download/Data-Privacy-Policy-Online-Data-Collection.pdf" className="block">
                  <div className="bg-[#FFE5B4] p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Data Privacy Policy</h3>
                    <p>View the latest guidelines on our data protection and privacy.</p>
                  </div>
                </Link>
              </motion.div>
              <motion.div
                className="hover-item"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link to="https://spandan.indianoil.co.in/ePIC/ValidateUser.jsp" className="block">
                  <div className="bg-[#FFE5B4] p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Customer Relationship Management</h3>
                    <p>Access important documents and resources for your CRM queries.</p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        </div>
        <footer className="bg-[#0D0B49] text-white py-4 text-center">
  <p className="text-sm">2024, All Rights Reserved. Created by - Vinayak</p>
</footer>

      </main>
    </div>
  );
};

export default HomePage;
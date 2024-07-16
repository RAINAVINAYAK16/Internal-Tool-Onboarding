import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-[#040720] text-white rounded-lg shadow-md focus:outline-none"
      >
        More
      </button>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-20"
      >
        <ul className="flex flex-col text-[#040720]">
          <li className="px-4 py-2 hover:bg-blue-100">
            <Link to="/safety-procedures">Safety Procedures</Link>
          </li>
          <li className="px-4 py-2 hover:bg-blue-100">
            <Link to="/technical-skills">Technical Skills</Link>
          </li>
          <li className="px-4 py-2 hover:bg-blue-100">
            <Link to="/mous-terms">MoUs and T&Cs</Link>
          </li>
          <li className="px-4 py-2 hover:bg-blue-100">
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Dropdown;

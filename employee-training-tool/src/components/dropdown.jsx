import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-1/2 w-1/8 flex flex-col mt-60 items-center">
      <button
        onClick={toggleDropdown}
        className="w-48 h-24 bg-[#89CFF0] text-black-500 rounded-full shadow-md focus:outline-none flex items-center justify-center text-xl font-bold"
      >
        More
      </button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-full bg-[#89CFF0] rounded-lg shadow-lg overflow-hidden z-20 mt-4"
      >
        <ul className="flex flex-col text-[#040720] h-full justify-center">
          <li className="px-4 py-4 hover:bg-blue-100">
            <Link to="/safety-procedures">Safety Procedures</Link>
          </li>
          <li className="px-4 py-4 hover:bg-blue-100">
            <Link to="/technical-skills">Technical Skills</Link>
          </li>
          <li className="px-4 py-4 hover:bg-blue-100">
            <Link to="/mous-terms">MoUs and T&Cs</Link>
          </li>
          <li className="px-4 py-4 hover:bg-blue-100">
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Dropdown;

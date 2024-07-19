import { useNavigate } from 'react-router-dom';
import IndianOilLogo from '../assets/IndianOilLogo.png';

const ReviewNotificationPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#d0eaff] text-white font-orbitron p-4">
            <header className="bg-[#0D0B49] w-full shadow-md mb-8 py-4 px-6 flex items-center justify-between">
                <div className="flex items-center">
                    <img src={IndianOilLogo} alt="Logo" className="w-16 h-16 object-contain" />
                    <h1 className="ml-4 font-bold text-xl">IOCL Internal Onboarding</h1>
                </div>
            </header>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full text-center">
                <h1 className="text-3xl font-extrabold mb-6">Thank You!</h1>
                <p className="text-lg mb-4">Your HR reviews will be sent to you via email shortly. Please stay tuned!</p>
                <button
                    onClick={() => navigate("/")}
                    className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default ReviewNotificationPage;

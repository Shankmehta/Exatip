import { useNavigate } from 'react-router-dom';
import { GraduationCap, User, MessageSquare, KeyRound } from 'lucide-react';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-50 flex items-center justify-center">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap items-center gap-8 px-4 py-10">
        
        {/* Admin Section */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="flex flex-col items-center text-center">
            {/* Profile Image */}
            <div className="w-44 h-44 rounded-full overflow-hidden mb-6 shadow-md border-4 border-blue-300">
              <img 
                src="/images/mypic.jpg" 
                alt="Admin"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Shashank Mehta</h2>
            <p className="text-gray-600 mb-4 text-sm italic">System Administrator</p>

            {/* Admin Details */}
            <div className="w-full space-y-4 text-left">
              <div className="flex items-center space-x-3 text-gray-700">
                <User size={24} />
                <span className="font-medium text-lg">Username: <b>ADMIN</b></span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <KeyRound size={24} />
                <span className="font-medium text-lg">Login: <b>SHANK</b></span>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <MessageSquare size={24} className="text-blue-500 mt-1" />
                <p className="text-gray-600 text-sm">
                  "Welcome to the Student Report System. Please ensure all student data is handled with confidentiality and care."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-2/3 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Student Report System
          </h1>
          <p className="text-lg text-gray-700 mb-10 leading-relaxed">
            Effortlessly manage and access student reports in a secure, efficient, and user-friendly environment.
          </p>

          {/* Button Section */}
          <div 
            onClick={() => navigate('/student/login')}
            className="cursor-pointer inline-block transform hover:scale-105 transition-transform duration-300"
          >
            <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 p-6 rounded-full shadow-md hover:shadow-lg transition-shadow">
              <GraduationCap size={120} className="text-blue-700" />
            </div>
          </div>
          <br></br>
          <button
            onClick={() => navigate('/student/login')}
            className="mt-8 text-xl px-10 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md font-semibold"
          >
            Get Student Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;


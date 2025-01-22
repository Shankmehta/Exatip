// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const LoginPage = () => {
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:2045/api/student/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials),
//       });

//       if (!response.ok) {
//         throw new Error('Invalid username or password');
//       }

//       const data = await response.json();
//       toast.success(data.message || 'Login successful!');
//       navigate('/student/report'); // Redirect to the report page
//     } catch (error: any) {
//       toast.error(error.message || 'Something went wrong');
//     }
//   };

//   return (
//     <div 
//       className="min-h-screen flex items-center justify-center"
//       style={{
//         backgroundImage: 'url("/images/sea.jpg")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center'
//       }}
//     >
//       <div className="bg-black/70 p-8 rounded-lg shadow-xl w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-2">
//             <label className="block text-white font-bold">Username</label>
//             <input
//               type="text"
//               className="w-full p-3 border rounded-md bg-white/90"
//               value={credentials.username}
//               onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
//               placeholder="Enter your username"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="block text-white font-bold">Password</label>
//             <input
//               type="password"
//               className="w-full p-3 border rounded-md bg-white/90"
//               value={credentials.password}
//               onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-colors"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2045/api/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      toast.success(data.message || 'Login successful!');
      navigate('/student/report');
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url("/images/sea.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="bg-black/70 p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-white font-bold">Username</label>
            <input
              type="text"
              className="w-full p-3 border rounded-md bg-white/90"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-white font-bold">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-md bg-white/90"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300 text-sm">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
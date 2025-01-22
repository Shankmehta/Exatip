// import React, { useState } from 'react';
// import { toast } from 'react-toastify';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       const response = await fetch('http://localhost:2045/api/student/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to process request');
//       }

//       const data = await response.json();
//       toast.success(data.message || 'Password reset instructions sent to your email!');
//       setEmail('');
//     } catch (error: any) {
//       toast.error(error.message || 'Failed to process request');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-black/70 p-8 rounded-lg shadow-xl w-96">
//       <h2 className="text-2xl font-bold mb-6 text-center text-white">Forgot Password</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="space-y-2">
//           <label className="block text-white font-bold">Email Address</label>
//           <input
//             type="email"
//             className="w-full p-3 border rounded-md bg-white/90"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
//         >
//           {isSubmitting ? 'Processing...' : 'Reset Password'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:2045/api/student/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to process request');
      }

      const data = await response.json();
      toast.success(data.message || 'Password reset instructions sent to your email!');
      setEmail('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to process request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200"
    >
      <div className="bg-black/70 p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-white font-bold">Email Address</label>
            <input
              type="email"
              className="w-full p-3 border rounded-md bg-white/90"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isSubmitting ? 'Processing...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;


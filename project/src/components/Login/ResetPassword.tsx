// import React, { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ResetPassword = () => {
//   const [searchParams] = useSearchParams();
//   const [newPassword, setNewPassword] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const token = searchParams.get('token'); // Get the token from the URL

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!token) {
//       toast.error('Invalid or missing token.');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await fetch('http://localhost:2045/api/student/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token, newPassword }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         toast.success(data.message || 'Password reset successful!');
//         setNewPassword('');
//       } else {
//         toast.error(data.error || 'Failed to reset password.');
//       }
//     } catch (error: any) {
//       toast.error(error.message || 'An error occurred.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-black/70 p-8 rounded-lg shadow-xl w-96">
//       <h2 className="text-2xl font-bold mb-6 text-center text-white">Reset Password</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="space-y-2">
//           <label className="block text-white font-bold">New Password</label>
//           <input
//             type="password"
//             className="w-full p-3 border rounded-md bg-white/90"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             placeholder="Enter your new password"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
//         >
//           {isSubmitting ? 'Resetting...' : 'Reset Password'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;


import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = searchParams.get('token'); // Get the token from the URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error('Invalid or missing token.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:2045/api/student/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || 'Password reset successful!');
        setNewPassword('');
      } else {
        toast.error(data.error || 'Failed to reset password.');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-indigo-300"
    >
      <div className="bg-black/70 p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Reset Password</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-white font-bold">New Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-md bg-white/90"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

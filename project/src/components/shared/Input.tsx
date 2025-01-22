// import React from 'react';

// interface InputProps {
//   type?: string;
//   value: string | number;
//   onChange: (value: string) => void;
//   label?: string;
//   placeholder?: string;
//   required?: boolean;
//   readonly?: boolean;
//   error?: string;
//   validation?: (value: string) => boolean;
// }

// const Input: React.FC<InputProps> = ({
//   type = 'text',
//   value,
//   onChange,
//   label,
//   placeholder,
//   required = false,
//   readonly = false,
//   error,
//   validation,
// }) => {
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.value;
//     if (!validation || validation(newValue)) {
//       onChange(newValue);
//     }
//   };

//   return (
//     <div className="mb-4">
//       {label && (
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           {label}
//           {required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}
//       <input
//         type={type}
//         value={value}
//         onChange={handleChange}
//         placeholder={placeholder}
//         readOnly={readonly}
//         required={required}
//         className={`w-full p-2 border rounded-md ${
//           error ? 'border-red-500' : 'border-gray-300'
//         } ${readonly ? 'bg-gray-100' : ''}`}
//       />
//       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//     </div>
//   );
// };

// export default Input;
import React from 'react';

interface InputProps {
  type?: string;
  value: string | number;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  error?: string;
  validation?: (value: string) => boolean;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  label,
  placeholder,
  required = false,
  readonly = false,
  error,
  validation,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!validation || validation(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={readonly}
        required={required}
        className={`w-full p-2 border rounded-md ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${readonly ? 'bg-gray-100' : ''}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;

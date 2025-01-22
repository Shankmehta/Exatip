
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const AddStudentButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/student/add')}
      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
    >
      <Plus size={20} />
      Add Student
    </button>
  );
};

export default AddStudentButton;
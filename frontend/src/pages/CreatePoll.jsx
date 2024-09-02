import { useState } from 'react';
import { createPoll } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const CreatePoll = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([{ text: '' }]);
  const [endDate, setEndDate] = useState('');
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  const handleOptionChange = (index, event) => {
    const newOptions = options.map((option, i) =>
      i === index ? { ...option, text: event.target.value } : option
    );
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { text: '' }]);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createPoll(title, description, options, endDate, isActive);

      alert('Poll created successfully!');

      setTitle('');
      setDescription('');
      setOptions([{ text: '' }]);
      setEndDate('');
      setIsActive(true);
      navigate('/');
    } catch (error) {
      console.error('Error creating poll:', error);
      alert('There was an error creating the poll.');
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center mt-8 sm:mt-20">
        Create a Poll
      </h1>
      <div className="lg:max-w-[720px] flex justify-center items-center mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Options
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, e)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Add Option
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm font-medium text-gray-700">
              Active
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              Create Poll
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePoll;

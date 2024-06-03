import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery); 
  };

  return (
    <form className="mb-4">
      <input
        type="text"
        placeholder="Search by name, company, job title..."
        value={query}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md w-full text-gray-600 mb-2"
      />
    </form>
  );
};

export default SearchBar;

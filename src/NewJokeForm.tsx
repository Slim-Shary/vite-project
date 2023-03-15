import axios from 'axios';
import { useState } from 'react';
import './App.css';

export default function NewJokeForm({ onNewJoke }: any) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post('/api/jokes', { text });
      onNewJoke(result.data);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="joke-txt">
            Add Joke
            <input
              type="text"
              id="joke-txt"
              className="input-field"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
      {error && <p>Something went wrong</p>}
    </>
  );
}

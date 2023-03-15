import './App.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { useEffect, useState } from 'react';
import NewJokeForm from './NewJokeForm';

export type Joke = {
  id: string;
  text: string;
};

function App() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setError(false);
      setLoading(true);
      try {
        const result = await axios.get(`/api/jokes?search=${search}`, {
          signal: controller.signal,
        });
        setJokes(result.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request status:', err.message);
          return;
        }

        setError(true);
      }
      setLoading(false);
    })();

    return () => {
      controller.abort();
    };
  }, [search]);

  const handleNewJoke = (joke: Joke) => {
    setJokes([joke, ...jokes]);
  };

  return (
    <div className="App">
      <h1>Jokes App</h1>
      <label htmlFor="joke-srch">
        Search
        <input
          type="text"
          className="input-field"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <NewJokeForm onNewJoke={handleNewJoke} />

      {loading && <p>Loading...</p>}

      {error ? (
        <p>Something went wrong!</p>
      ) : (
        jokes.map((joke) => (
          <div key={joke.id}>
            <h3>{joke.text}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default App;

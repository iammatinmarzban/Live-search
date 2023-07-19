import { useState, useEffect } from "react";
import "./App.css";
// Fetching the API using the
//FETCH API

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const { data } = fetch(
      `https://rickandmortyapi.com/api/character/?name=${query}`
    )
      .then((res) => res.json())

      .then(
        (data) => {
          setIsLoaded(true);
          setPosts(data.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [query]);
  console.log(posts);
  return (
    <div className="containing-input">
      <h1>Rick and Morty</h1>
      <div>
        <input
          type="text"
          name=""
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <ul className="post-container">
        {posts.map((post) => (
          <li className="postCard">
            <img src={post.image} alt={post.name} />
            <p>{post.name}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <a href="">Next</a>
        <a href="">prev</a>
      </div>
    </div>
  );
}

export default App;

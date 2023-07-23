import { useState, useEffect } from "react";
import "./App.css";
// Fetching the API using the
//FETCH API

function App() {
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [searchParam] = useState(["name"]);

  useEffect(() => {
    for (let i = 1; i <= 42; i++) {
      const { data } = fetch(
        `https://rickandmortyapi.com/api/character/?name=${query}&page=${i}`
      )
        .then((res) => res.json())
        .then(
          (data) => {
            setIsLoaded(true);
            setPosts((oldData) => [...oldData.concat(data.results)]);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, []);

  const data = Object.values(posts);

  function Search(posts) {
    return posts.filter((post) => {
      return searchParam.some((newPost) => {
        return (
          post[newPost].toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1
        );
      });
    });
  }
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
        {Search(data).map((post) => (
          <li className="postCard">
            <img src={post.image} alt={post.name} />
            <p>{post.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

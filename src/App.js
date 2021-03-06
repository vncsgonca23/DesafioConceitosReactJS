import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  
  const [repositories, setRepositories] = useState([])
  async function handleAddRepository() {
  const response = await api.post('/repositories',{
      url: "https://github.com/Rocketseat/umbriel",
      title: `Projeto ${Date.now()}`,
       techs: ["Node", "Express", "TypeScript"]
    })
  setRepositories([...repositories,response.data])
  }

  async function handleRemoveRepository(id) {
    try{
      await api.delete(`/repositories/${id}`)
      setRepositories(repositories.filter((repository)=>repository.id!==id))
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    api.get('/repositories').then(response=>{
    setRepositories(response.data)
    })
  },[])
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository=>
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover 
          </button>
        </li>
        )}
      </ul>


        <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

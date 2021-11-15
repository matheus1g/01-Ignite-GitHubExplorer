import { useState, useEffect } from "react";
import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss'

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {

  const [repositories, setRepositories] = useState<Repository[]>([]);

  const [user,setUser] = useState('matheus1g');
  const [nick,setNick] = useState('');

  useEffect(() => {
     fetch(`https://api.github.com/users/${user}/repos`)
      .then(response => response.json())     
      .then(data => setRepositories(data))

  },[user])

  function handleClick(nick:string) {
    if (!nick) return (alert("Preencha o usuario"))
    
    setUser(nick);
    setNick('');
  }

  return(
    <section className="repository-list">
      <h1>Lista de repositório - {user}</h1>
      <input
      type="text"
      placeholder="Digite o usuario"
      onChange={(e) => setNick(e.target.value)}
      value={nick}
      />
      <button onClick={() => handleClick(nick)} >
      Buscar
      </button>
      <ul>
        {repositories.map(repository => {
          return <RepositoryItem key={repository.name} repository={repository} />
        })}
      </ul>  
    </section>
  );
}
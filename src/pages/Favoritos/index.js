
import { useEffect, useState } from 'react'
import './favoritos.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos() {

    const [filmes, setFilmes] = useState([])

    useEffect(() => {

        const minhaLista = localStorage.getItem("@vorcarofilm");
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    function excluirFilme(id) {
        
        let filmesFiltrados = filmes.filter((item) => {

            return(item.id !== id)
        })

        setFilmes(filmesFiltrados);
        localStorage.setItem("@vorcarofilm", JSON.stringify(filmesFiltrados));
        toast.success("Filme removido com sucesso!")
        
    }

    return(


        <div className="meus-filmes">
            <h1>Minha Lista</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo!</span>}

            <ul>
                {filmes.map((itemAtual) => {

                    return (

                        <li key={itemAtual.id}>
                            <span>{itemAtual.title}</span>

                            <div>
                                <Link to={`/filme/${itemAtual.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(itemAtual.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )

}

export default Favoritos;
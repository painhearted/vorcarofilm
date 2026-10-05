import { useEffect, useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import api, {apiKey} from '../services/api'
import './filme-info.css';
import {toast} from 'react-toastify';

function Filme() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadingFilme() {
            
            await api.get(`/movie/${id}`, {
                params: {

                    api_key: apiKey,
                    language: "pt-BR"
                }
            })

            .then((response) => {

                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {

                console.log("FILME NÃO ENCONTRADO!");
                navigate("/", {replace: true});
                return;
            })

        }

        loadingFilme();


    }, [navigate, id])


    function salvarFilme() {

        const minhaLista = localStorage.getItem("@vorcarofilm")

        let filmeSalvo = JSON.parse(minhaLista) || [];

        const hasFilme = filmeSalvo.some( (filmesSalvos) => filmesSalvos.id === filme.id)


        if(hasFilme) {

            toast.warn("Esse filme já está na sua lista!")
            return;
        }

        filmeSalvo.push(filme);
        localStorage.setItem("@vorcarofilm", JSON.stringify(filmeSalvo));
        toast.success("Filme salvo com sucesso!")

    }

    if (loading) {

        return (

            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (

        <div className="filme-info">

            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://www.google.com/search?q=${filme.title} Ingresso`}>
                        Ingresso
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;
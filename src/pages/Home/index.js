import {useEffect, useState} from 'react'
import api from '../services/api';

const apiKey = process.env.REACT_APP_API_KEY

function Home() {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {

        async function loadFilmes() {

            const response = await api.get("movie/now_playing", {
                params: {

                    api_key: apiKey,
                    language: "pt-BR",
                    page: 1,
                }
            })

            console.log(response.data.results.slice(0,10))
        }

        loadFilmes();

    }, [])
    return (

        <div>
        <h1>BEM VINDO A HOME</h1>
        </div>
    )
}

export default Home;
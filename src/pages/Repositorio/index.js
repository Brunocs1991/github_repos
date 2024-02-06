import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {BackButton, Container, Loading, Owner} from "./styles";
import api from "../../services/api";
import {FaArrowLeft} from "react-icons/fa";

const Repositorio = () => {

    const {repositorio} = useParams();
    const [repo, setRepo] = useState({});
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            const nomeRepo = decodeURIComponent(repositorio)
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`repos/${nomeRepo}`),
                api.get(`repos/${nomeRepo}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5
                    }
                })
            ]);
            setRepo(repositorioData.data)
            setIssues(issuesData.data)
            setLoading(false)
        }
        load().then().catch()
    },[repositorio]);

    if(loading){
        return (
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }
    return (
        <Container>
            <BackButton to={"/"}>
                <FaArrowLeft color={"#000000"} size={30}/>
            </BackButton>
            <Owner>
                <img src={repo.owner.avatar_url} alt={repo.owner.login}/>
                <h1>{repo.name}</h1>
                <p>{repo.description}</p>
            </Owner>
        </Container>
    )
}
export default Repositorio

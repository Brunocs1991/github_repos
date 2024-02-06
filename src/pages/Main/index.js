import React, {useCallback, useEffect, useState} from "react";
import {Container, DeleteButton, Form, List, SubmitButton} from "./styles";
import {FaBars, FaGithub, FaPlus, FaSpinner, FaTrash} from "react-icons/fa";
import api from "../../services/api";
import {Link} from "react-router-dom";

const Main = () => {
    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null)


    useEffect(() => {
        const repoStorage = localStorage.getItem('repos');
        if (repoStorage) {
            setRepositorios(JSON.parse(repoStorage));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios))
    }, [repositorios]);


    const handleInputChange = (e) => {
        setNewRepo(e.target.value)
        setAlert(null)
    }
    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        async function submit() {
            setLoading(true);
            setAlert(null);
            if (newRepo === '') {
                setAlert(true);
                throw new Error('Você precisa indicar um repositorio');
            }
            const hasRepo = repositorios.find(repo => repo.name === newRepo)
            if (hasRepo) {
                setAlert(true);
                throw new Error('Repositorio duplicado');
            }
            return await api.get(`repos/${newRepo}`)
        }

        submit()
            .then(response => {
                const data = {
                    name: response.data.full_name
                }
                setRepositorios([...repositorios, data])
                setNewRepo('')
            })
            .catch((e) => {
                setAlert(true);
                console.log(e)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [newRepo, repositorios]);
    const handleDelete = useCallback((repo) => {
        const find = repositorios.filter(r => r.name !== repo)
        setRepositorios(find)
    }, [repositorios]);

    return (
        <Container>
            <h1>
                <FaGithub size={25}/>
                Meus Repositorios
            </h1>
            <Form onSubmit={handleSubmit} error={alert}>
                <input
                    type="text"
                    placeholder="Adicionar Repositório"
                    value={newRepo}
                    onChange={handleInputChange}
                />
                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner color="#FFFFFF" size={14}/>
                    ) : (
                        <FaPlus color="#FFFFFF" size={14}/>
                    )}

                </SubmitButton>
            </Form>
            <List>
                {repositorios.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton onClick={() => {
                                handleDelete(repo.name)
                            }}>
                                <FaTrash size={14}/>
                            </DeleteButton>
                            {repo.name}
                        </span>
                        <Link to={`/repositorio/${encodeURIComponent(repo.name)}`} >
                            <FaBars size={20}/>
                        </Link>
                    </li>
                ))}
            </List>
        </Container>
    )
}

export default Main

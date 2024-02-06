import React, {useCallback, useState} from "react";
import {Container, Form, SubmitButton} from "./styles";
import {FaGithub, FaPlus, FaSpinner} from "react-icons/fa";
import api from "../../services/api";

const Main = () => {
    const [newRepo, setNewRepo] = useState('')
    const [repositorios, setRepositorios] = useState([])
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        setNewRepo(e.target.value)
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        async function submit() {
            setLoading(true)
            return await api.get(`repos/${newRepo}`)
        }

        submit()
            .then(response => {
                const data = {
                    name: response.data.fullName
                }
                setRepositorios([...repositorios, data])
                setNewRepo('')
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [newRepo, repositorios]);
    return (
        <Container>
            <h1>
                <FaGithub size={25}/>
                Meus Repositorios
            </h1>
            <Form onSubmit={handleSubmit}>
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
        </Container>
    )
}

export default Main

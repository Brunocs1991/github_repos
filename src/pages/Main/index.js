import React, {useState} from "react";
import {Container, Form, SubmitButton} from "./styles";
import {FaGithub, FaPlus} from "react-icons/fa";

const Main = () => {
    const [newRepo, setNewRepo] = useState('')
    return (
        <Container>
            <h1>
                <FaGithub size={25}/>
                Meus Repositorios
            </h1>
            <Form onSubmit={() =>{}}>
                <input
                    type="text"
                    placeholder="Adicionar Repositórios"
                />
                <SubmitButton>
                    <FaPlus  color="#FFFFFF" size={25}/>
                </SubmitButton>
            </Form>
        </Container>
    )
}

export default Main

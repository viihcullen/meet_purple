import React, { useState } from 'react';
import TaskService from "../service/user.services";
import { Form, InputGroup, Button } from "react-bootstrap";
import '../styles/main.css';

export const AddUser = () => {

    const [taskName, setTaskName] = useState("");
    const [taskEmail, setTaskEmail] = useState("");
    const [taskTelefone, setTaskTelefone] = useState("");
    const [taskCidade, setTaskCidade] = useState("");

    
    const handleSubmit = async (e) => {

        e.preventDefault();

        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

        const newTask = {
            taskName, taskEmail, taskTelefone, taskCidade, date,
        }

        
        if (taskName === "" || taskEmail === "") {
            console.log("Dados insufientes");
            alert("Por favor, coloque os dados completos");
            return;
        }

        try {
            await TaskService.addTasks(newTask);
            setTaskName("");
            setTaskEmail("");
            setTaskTelefone("");
            setTaskCidade("");
        } catch (err) {
            console.log(err);
            return;
        }
    };

    return (
        <div id='mainDiv'>
            <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                <h1>Novo Usuário</h1>
                    <InputGroup>
                        <Form.Control  type="text" placeholder="Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <InputGroup>
                        <Form.Control type="text" placeholder="Email" value={taskEmail} onChange={(e) => setTaskEmail(e.target.value)} />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <InputGroup>
                        <Form.Control type="text" placeholder="Telefone" value={taskTelefone} onChange={(e) => setTaskTelefone(e.target.value)} />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <InputGroup>
                        <Form.Control type="text" placeholder="Cidade" value={taskCidade} onChange={(e) => setTaskCidade(e.target.value)} />
                    </InputGroup>
                </Form.Group>

                <Button id='add-button' type="Submit">
                    Adicionar
                </Button>
            </form>
        </div>
    )
}

import React, { useState } from 'react';
import TaskService from "../service/user.services";
import { Form, InputGroup, Button } from "react-bootstrap";
import '../styles/main.css';

export const AddUser = () => {

    const [taskPaciente, setTaskPaciente] = useState("");
    const [taskMedico, setTaskMedico] = useState("");
    const [taskRemedio, setTaskRemedio] = useState("");
    const [taskProntuario, setTaskProntuario] = useState("");

    
    const handleSubmit = async (e) => {

        e.preventDefault();
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

        const newTask = {
            taskPaciente, taskMedico, taskRemedio, taskProntuario, date,
        }

        
        if (taskPaciente === "" || taskMedico === "") {
            console.log("Dados insufientes");
            alert("Por favor, coloque os dados completos");
            return;
        }

        try {
            await TaskService.addTasks(newTask);
            setTaskPaciente("");
            setTaskMedico("");
            setTaskRemedio("");
            setTaskProntuario("");
        } catch (err) {
            console.log(err);
            return;
        }
    };

    return (
        <div id='mainDiv'>
            <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                <h1>Nova Receita</h1>
                    <InputGroup>
                        <Form.Control  type="text" placeholder="Paciente" value={taskPaciente} onChange={(e) => setTaskPaciente(e.target.value)} />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <InputGroup>
                        <Form.Control type="text" placeholder="Médico" value={taskMedico} onChange={(e) => setTaskMedico(e.target.value)} />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <InputGroup>
                        <Form.Control type="text" placeholder="Remédio" value={taskRemedio} onChange={(e) => setTaskRemedio(e.target.value)} />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <InputGroup>
                        <Form.Control type="text" placeholder="Prontuário" value={taskProntuario} onChange={(e) => setTaskProntuario(e.target.value)} />
                    </InputGroup>
                </Form.Group>

                <Button id='add-button' type="Submit">
                    Adicionar
                </Button>
            </form>
        </div>
    )
}

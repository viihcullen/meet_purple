import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import UserService from "../service/user.services";

export const UserList = () => {

    const [users, setUsers] = useState([]);
    const [existingTaskId, setExistingTaskId] = useState("");
    const [existingTaskPaciente, setExistingTaskPaciente] = useState("");
    const [existingTaskMedico, setExistingTaskMedico] = useState("");
    const [existingTaskProntuario, setExistingTaskProntuario] = useState("");
    const [existingTaskRemedio, setExistingTaskRemedio] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getTasks();
    }, [users])

    
    const handleUpdate = async () => {

        
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

        
        if (existingTaskPaciente === "" || existingTaskMedico === "") {
            console.log("Required data missing");
            alert("Please fill the required details");
            return;
        }

        const updatedTask = {
            taskPaciente: existingTaskPaciente,
            taskMedico: existingTaskMedico,
            taskRemedio: existingTaskRemedio,
            taskProntuario: existingTaskProntuario,
            date,
        }

        
        try {
            await UserService.updateTask(existingTaskId, updatedTask);
        } catch (err) {
            console.log(err);
            return;
        }
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    
    const getTasks = async () => {
        try {
            const data = await UserService.getAllTasks();
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (err) {
            console.log(err);
            return;
        }
    }

    
    const editTask = async (id, paciente, medico, prontuario, remedio) => {
        setOpen(true);
        setExistingTaskId(id);
        setExistingTaskPaciente(paciente);
        setExistingTaskMedico(medico);
        setExistingTaskProntuario(prontuario);
        setExistingTaskRemedio(remedio);
    }

    
    const showConfirm = async (id) => {
        if (window.confirm('Tem certeza que quer excluir?')) {
            try {
                await UserService.deleteTask(id)
            } catch (err) {
                console.log(err);
                return;
            }
        }
    }

    return (
        <div id='tableDiv'>
            <h1>Receita</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className='barra'>
                            <TableCell align="left" >Paciente</TableCell>
                            <TableCell align="left">Médico</TableCell>
                            <TableCell align="left">Remédio</TableCell>
                            <TableCell align="left">Prontuário</TableCell>
                            <TableCell align="left">Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(task => (
                            <TableRow
                                key={task.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{task.taskPaciente}</TableCell>
                                <TableCell align="left">{task.taskMedico}</TableCell>
                                <TableCell align="left">{task.taskRemedio}</TableCell>
                                <TableCell align="left">{task.taskProntuario}</TableCell>
                                <TableCell align="left">
                                    <Stack direction="row" spacing={2}>
                                        <Button id='editarbutton' onClick={(e) => editTask(task.id, task.taskPaciente, task.taskMedico, task.taskRemedio, task.taskProntuario)}>
                                            Editar
                                        </Button>

                                        <Button className="delete" id='delete' onClick={(e) => showConfirm(task.id)} >
                                            Excluir
                                        </Button>
                                    </Stack>
                                </TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleUpdate}>
                <h1 align="center">Atualizar</h1>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <TextField autoFocus margin="dense" value={existingTaskPaciente} label="Alterar Name" type="text" fullWidth variant="standard" onChange={(e) => setExistingTaskPaciente(e.target.value)} />
                    <TextField autoFocus margin="dense" value={existingTaskMedico} label="Medico" type="text" fullWidth variant="standard" onChange={(e) => setExistingTaskMedico(e.target.value)}/>
                    <TextField autoFocus margin="dense" value={existingTaskRemedio} label="Remedio" type="text" fullWidth variant="standard" onChange={(e) => setExistingTaskRemedio(e.target.value)} />
                    <TextField autoFocus margin="dense" value={existingTaskProntuario} label="Prontuario" type="text" fullWidth variant="standard" onChange={(e) => setExistingTaskProntuario(e.target.value)} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancelar</Button>
                    <Button onClick={handleUpdate}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

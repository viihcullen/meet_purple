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
    const [existingTaskName, setExistingTaskName] = useState("");
    const [existingTaskEmail, setExistingTaskEmail] = useState("");
    const [existingTaskTelefone, setExistingTaskTelefone] = useState("");
    const [existingTaskCidade, setExistingTaskCidade] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getTasks();
    }, [users])

    
    const handleUpdate = async () => {

        
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

        
        if (existingTaskName === "" || existingTaskEmail === "") {
            console.log("Required data missing");
            alert("Please fill the required details");
            return;
        }

        const updatedTask = {
            taskName: existingTaskName,
            taskEmail: existingTaskEmail,
            taskTelefone: existingTaskTelefone,
            taskCidade: existingTaskCidade,
            date
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

    
    const editTask = async (id, name, email, telefone, cidade) => {
        setOpen(true);
        setExistingTaskId(id);
        setExistingTaskName(name);
        setExistingTaskEmail(email);
        setExistingTaskTelefone(telefone);
        setExistingTaskCidade(cidade);
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
            <h1>USUÁRIOS</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" >Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Cidade</TableCell>
                            <TableCell align="left">Telefone</TableCell>
                            <TableCell align="left">Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(task => (
                            <TableRow
                                key={task.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{task.taskName}</TableCell>
                                <TableCell align="left">{task.taskEmail}</TableCell>
                                <TableCell align="left">{task.taskCidade}</TableCell>
                                <TableCell align="left">{task.taskTelefone}</TableCell>
                                <TableCell align="left">
                                    <Stack direction="row" spacing={2}>
                                        <Button id='editarbutton' onClick={(e) => editTask(task.id, task.taskName, task.taskEmail, task.taskCidade, task.taskTelefone)}>
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
                    <TextField autoFocus margin="dense" value={existingTaskName} label="Alterar Name" type="text" fullWidth variant="standard" onChange={(e) => setExistingTaskName(e.target.value)} />
                    <TextField autoFocus margin="dense" value={existingTaskEmail} label="Email" type="text" fullWidth variant="standard" onChange={(e) => setExistingTaskEmail(e.target.value)}/>
                    <TextField autoFocus margin="dense" value={existingTaskTelefone} label="Telefone" type="text" fullWidth variant="standard" onChange={(e) => setExistingTaskTelefone(e.target.value)} />
                    <TextField autoFocus margin="dense" value={existingTaskCidade} label="Cidade" type="text" fullWidth variant="standard" onChange={(e) => setExistingTaskCidade(e.target.value)} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancelar</Button>
                    <Button onClick={handleUpdate}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

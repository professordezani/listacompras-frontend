import React, { useState, useMemo } from 'react';
import Header from './Header';
import api from './api';
import { Table, 
    TableRow, 
    TableCell, 
    Switch, 
    Button, 
    Dialog, 
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function ListaPage() { 

    const [ produtos, setProdutos ] = useState([]);
    const [ open, setOpen ] = useState(false);

    const [ nome, setNome ] = useState('');
    const [ quantidade, setQuantidade ] = useState(1);
 
    async function loadData() { 
        const response = await api.get('/'); 
        setProdutos(response.data);
    }

    useMemo(loadData, []);

    function openDialog() { 
        setOpen(true);
    }
    // const openDialog = () => setOpen(true);

    function closeDialog() {
        setOpen(false);
    }

    async function salvar() { 
        await api.post('/', {nome, quantidade}); 
        loadData();
        setNome('');
        setQuantidade(1);
        closeDialog();
    }

    return <>
        <Header/>
        <Table style={{marginTop: '80px', marginBottom: '20px'}}>
            {
                produtos.map(item => (
                    <TableRow>
                        <TableCell>{item.id}</TableCell>
                        <TableCell style={{width: '70%'}}>{item.nome}</TableCell>
                        <TableCell>{item.quantidade}</TableCell>
                        <TableCell>
                            <Switch checked={item.comprado} color="primary" />
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="secondary" size="small">
                                <DeleteIcon/> Apagar
                            </Button>
                        </TableCell>
                    </TableRow>
                ))
            }
        </Table>

        <Button 
            onClick={openDialog}
            variant="contained" 
            color="primary">
                Adicionar
        </Button>

        <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>Novo Produto</DialogTitle>
            <DialogContent>
                <DialogContentText>Preencha os dados para cadastrar um novo produto.</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nome"
                    label="Nome"
                    type="text"
                    fullWidth
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="quantidade"
                    label="Quantidade"
                    type="number"
                    fullWidth
                    value={quantidade}
                    onChange={e => setQuantidade(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancelar</Button>
                <Button onClick={salvar}>Salvar</Button>
            </DialogActions>
        </Dialog>
    </>
}

export default ListaPage;
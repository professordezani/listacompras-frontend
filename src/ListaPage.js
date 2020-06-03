import React, { useState, useMemo } from 'react';
import Header from './Header';
import api from './api';
import { Table, TableRow, TableCell, Switch, Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function ListaPage() { 

    const [ produtos, setProdutos ] = useState([]);

    async function loadData() { 
        const response = await api.get('/');
        setProdutos(response.data);
    }

    useMemo(loadData, []);

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

        <Button variant="contained" color="primary">Adicionar</Button>
    </>
}

export default ListaPage;
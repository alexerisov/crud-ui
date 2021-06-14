import * as React from 'react';
import SaveEditButtons from './SaveEditButtons';
import { DataGrid } from '@material-ui/data-grid';
import {makeStyles} from '@material-ui/core/styles';
import Create from './Create';


export default function DataTable() {
    const [editRowsModel, setEditRowsModel] = React.useState({});

    const handleEditRowModelChange = React.useCallback((params) => {
        setEditRowsModel(params.model);
    }, []);

    const handleCommit = ({id, api}) => {
        const fields = ['firstName', 'lastName']
        fields.map(el => {
            let params = api.getEditCellPropsParams(id, el)
            api.commitCellChange(params);
        })
    }

    const handleRemove = ({id, api}) => {
        if (!id || !api) {
            return
        }
        api.updateRows([{ id, _action: 'delete' }]);
    }

    const useStyles = makeStyles({
        root: {
            '&.MuiDataGrid-root .MuiDataGrid-cell': {
                outline: 'none',
            },
            '&.MuiDataGrid-root .MuiDataGrid-columnHeader': {
                outline: 'none',
            }
        }
    });

    const handleDoubleCellClick = React.useCallback((params, event) => {
        event.stopPropagation();
    }, []);

// Prevent from rolling back on escape
    const handleCellKeyDown = React.useCallback((params, event) => {
        if (['Escape', 'Delete', 'Backspace', 'Enter', 'Tab'].includes(event.key)) {
            event.stopPropagation();
        }
    }, []);

// Prevent from committing on blur
    const handleCellBlur = React.useCallback((params, event) => {
        if (params.cellMode === 'edit') {
            event?.stopPropagation();
        }
    }, []);

    const classes = useStyles();


    const columns = [
        { field: 'firstName', editable: true, headerName: 'First name', flex: 1/5 },
        { field: 'lastName', editable: true, headerName: 'Last name', flex: 1/5},
        {
            field: ' ',
            sortable: false,
            flex: 1/5,
            align: 'right',
            headerAlign: 'right',
            renderHeader: () => <Create />,
            renderCell: (params) => <SaveEditButtons params={params}
                                                     commit={handleCommit}
                                                     remove={handleRemove} />,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: 'Alana', age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    return (
        <div style={{ width: '100%' }}>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows}
                          columns={columns}
                          pageSize={5}
                          disableSelectionOnClick
                          onCellDoubleClick={handleDoubleCellClick}
                          onCellBlur={handleCellBlur}
                          onCellKeyDown={handleCellKeyDown}
                          disableColumnMenu           
                          className={classes.root}
                />
            </div>
        </div>
    );
}


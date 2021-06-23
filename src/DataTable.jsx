import * as React from 'react';
import SaveEditButtons from './SaveEditButtons';
import {DataGrid} from '@material-ui/data-grid';
import {makeStyles} from '@material-ui/core/styles';
import Create from './Create';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';


export default function DataTable() {
    const [rows, setRows] = React.useState([])
    const [editRowsModel, setEditRowsModel] = React.useState({});

    const notify = (message) => toast(message)

    const handleEditRowModelChange = React.useCallback((params) => {
        setEditRowsModel(params.model);
    }, []);

    const url = "http://178.128.196.163:3000"

    function handleUpdate({id, api}) {
        const data = {}
        const fields = ['name','phone','date','email','age']
        fields.map(el => {
            data[el] = api.getEditCellProps(id, el).value || ""
        })
        axios
      .post(`${url}/api/records/${id}`, data)
      .then((res) => {
        if (res.request.status != 200) {
          throw Error("PUT request is not success")
        }
        setRows(
          rows.map((el) =>
            el.id === id ? { id, data: data } : el
          )
        )
      })
      .catch((error) => {
        notify(error.message)
      })
    }

    function handleRemove ({id, api}) {
        axios
      .delete(`${url}/api/records/${id}`)
      .then((res) => {
        if (res.request.status != 200) {
          throw Error("DELETE request is not success")
        }
        setRows(rows.filter((el) => el.id != id))
      })
      .catch((error) => {
        notify(error.message)
      })
    }

    function handleCreate (data) {
        const id = rows?.length + 1 || 0;

          axios
            .put(`${url}/api/records`, {"_id": id, data})
            .then((res) => {
                if (res.statusText != "OK") {
                throw Error("POST request is not success")
              }
                console.log({id, data});
              setRows([...rows, {id, data}])
            })
            .catch((error) => {
              notify(error.message)
            })
    }

    const unpackData = (data) => {
        let unpacked = JSON
            .stringify(data)
            .replaceAll('_id', 'id')
        return JSON.parse(unpacked)
    }

    React.useEffect(() => {
        setTimeout(() => {
          axios
            .get(`${url}/api/records`)
            .then((res) => {
              if (res.request.statusText != "OK") {
                throw Error("Could not fetch the data, resource is not available")
              }
                return unpackData(res.data)
            })
            .then((data) => {
              setRows(data)
            })
            .catch((err) => {
              notify(err.message)
            })
        }, 1000)
      }, [])

    /* Remove outline styles */
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

    /* Prevent default behavior */
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

    /* Column defenition */
    const columns = [
        { field: 'id', editable: true, headerName: 'Id', flex: 1/5},
        { field: 'name', editable: true, headerName: 'Name', flex: 1/5,
            valueGetter: (params) => {
                return params.row.data.name
            }},
        { field: 'phone', editable: true, headerName: 'Phone', flex: 1/5,
            valueGetter: (params) => {
                return params.row.data.phone
            }},
        { field: 'date', editable: true, headerName: 'Date', flex: 1/5,
            valueGetter: (params) => {
                return params.row.data.date
            }},
        { field: 'age', editable: true, headerName: 'Age', flex: 1/5,
            valueGetter: (params) => {
                return params.row.data.age
            }},
        { field: 'email', editable: true, headerName: 'Email', flex: 1/5,
            valueGetter: (params) => {
                return params.row.data.email
            }},
        { field: 'postText', editable: true, headerName: 'postText', flex: 1/5,
            valueGetter: (params) => {
                return params.row.data.postText
            }},
        {
            field: ' ',
            sortable: false,
            flex: 3/10,
            align: 'right',
            headerAlign: 'right',
            renderHeader: (params) => <Create params={params}
                                              create={handleCreate}/>,

            renderCell: (params) => <SaveEditButtons params={params}
                                                     update={handleUpdate}
                                                     remove={handleRemove} />,
        },
    ];

    return (
        <div style={{ width: '100%' }}>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows}
                          columns={columns}
                          pageSize={10}
                          disableSelectionOnClick
                          onCellDoubleClick={handleDoubleCellClick}
                          onCellBlur={handleCellBlur}
                          onCellKeyDown={handleCellKeyDown}
                          disableColumnMenu           
                          className={classes.root}
                />
                <Toaster />
            </div>
        </div>
    );
}


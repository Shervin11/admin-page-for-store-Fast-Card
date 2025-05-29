import { useState } from "react";
import { Button, FormControl, InputLabel, Paper, Select, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DataGrid } from '@mui/x-data-grid';

const Orders = () => {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const columns = [
    { field: 'id', headerName: 'Order', width: 230 },
    { field: 'firstName', headerName: 'First name', width: 230 },
    { field: 'lastName', headerName: 'Last name', width: 230 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 230,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];

  const rows = [
    { id: '#12512B', lastName: 'Snow', firstName: 'Jon', },
    { id: '#12523C', lastName: 'Lannister', firstName: 'Cersei', },
    { id: '#51232A', lastName: 'Lannister', firstName: 'Jaime', },
    { id: '#23534D', lastName: 'Stark', firstName: 'Arya', },
    { id: '#51323C', lastName: 'Targaryen', firstName: 'Daenerys',},
    { id: '#35622A', lastName: 'Melisandre', firstName: null,  },
    { id: '#34232D', lastName: 'Clifford', firstName: 'Ferrara', },
    { id: '#56212D', lastName: 'Frances', firstName: 'Rossini', },
    { id: '#23534D', lastName: 'Roxie', firstName: 'Harvey', },
  ];

  const paginationModel = { page: 0, pageSize: 5 };


  return <>
    <section>
      <article className="flex items-center justify-between">
        <h2 className="text-[24px] font-bold">Orders</h2>
        <Button className="h-[40px]" variant="contained">+ Add order</Button>
      </article>
      <article className="mt-[40px] flex md:flex-row flex-col gap-[10px] md:items-center justify-between">
        <article className="flex items-center gap-[12px]">
          <TextField id="outlined-basic" label='Search...' variant="outlined" />
          <FormControl className="w-[150px] h-[56px]">
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Filter"
              onChange={handleChange}
            >
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'Active'}>Active</MenuItem>
              <MenuItem value={'Inactive'}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </article>
        <article className="flex items-center gap-[12px]">
          <article className="border-[#E2E8F0] border-[1px] rounded-[4px] w-[40px] flex items-center justify-center h-[40px]">
            <BorderColorOutlinedIcon className="text-[#2563EB] cursor-pointer" />
          </article>
          <article className="border-[#E2E8F0] border-[1px] rounded-[4px] w-[40px] flex items-center justify-center h-[40px]">
            <DeleteOutlineOutlinedIcon className="text-[#2563EB] cursor-pointer" />
          </article>
        </article>
      </article>

      <Paper className="mt-[20px]" sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
    </Paper>
    </section>
  </>;
};

export default Orders;

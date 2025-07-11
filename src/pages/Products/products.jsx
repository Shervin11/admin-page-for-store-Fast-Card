import { useEffect, useState } from "react";
import { Button, FormControl, InputLabel, Select, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProduct } from "../../entities/api/productsApi";
import API from "../../shared/config/api";
import { Link } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const Products = () => {
  const [age, setAge] = useState('');
  const products = useSelector((state) => state.product.products)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idx, setIdx] = useState(null)
  
  const handleChange = (event) => {
    setAge(event.target.value);
  };
 
  useEffect(() => {
    dispatch(getProduct())
  }, [])

    return <>
      <section>
        <article className="flex items-center justify-between">
          <h2 className="text-[24px] font-bold">Products</h2>
          <Link to={'/dash/addProduct'}>
            <Button className="h-[40px]" variant="contained">+ Add products</Button>
          </Link>
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
  
          <table className="w-full mt-[20px] table-auto text-sm text-left">
            <thead className="text-gray-500 border-b text-xs">
              <tr>
                <th className="p-4">
                  <input type="checkbox" className="w-4 h-4" />
                </th>
                <th className="p-4">Product</th>
                <th className="p-4">Inventory</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {products && products.map((e) => {
                return (
                  <tr className="border-b-[1px] border-gray-500" key={e.id}>
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-blue-500 cursor-pointer"
                      />
                    </td>
                    <td className="p-4 font-medium text-blue-600 flex items-center gap-[8px]">
                      <img
                        style={{ width: "50px", height: "50px", borderRadius: '5px' }}
                        src={
                          e.image ? `${API}/images/${e.image}` : "placeholder.jpg"
                        }
                        alt={e.productName}
                      />
                      <p>{e.productName}</p>
                    </td>
                    <td className="p-4">
                      {e.quantity ? `${e.quantity} in stock` : "Out of Stock"}
                    </td>
                    <td className="p-4">{e.categoryName}</td>
                    <td className="p-4">$ {e.price}</td>
                    <td className="p-4">
                      <article className="flex items-center gap-[8px]">
                        <Link to={`${e.id}`}>
                          <BorderColorOutlinedIcon className="text-[#2563EB] cursor-pointer" />
                        </Link>
                        <DeleteOutlineOutlinedIcon onClick={async () => {
                          await dispatch(deleteProduct(e.id))
                        }} className="text-[red] cursor-pointer" />
                      </article>
                    </td>
                  </tr>
                );
              })}
            </tbody>
        </table>
      </section>
    </>;
};
export default Products;

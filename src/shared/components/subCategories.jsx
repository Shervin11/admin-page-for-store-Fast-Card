import React, { useEffect, useState } from "react";
import { Box, Button,FormControl,InputLabel,MenuItem,Modal,Select,TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addSubCategory, deleteSubCategory, getSubCategory } from "../../entities/api/subCategoryApi";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';


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

const SubCategory = () => {
  const subCategory = useSelector((state) => state.subCategory.subCategory);
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [editSubCategoryName, setEditSubCategoryName] = useState("");
  const [editSubCategoryId, setEditSubCategoryId] = useState("");
  const [editCategoryName, setEditCategoryName] = useState('')
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const handleAddSubCategory = () => {
    const newSubCategory = {
      subCategoryName: subCategoryName,
      CategoryId: Number(subCategoryId),
    };
    dispatch(addSubCategory(newSubCategory));
    setSubCategoryName("");
    setSubCategoryId("");
  };
  
  useEffect(() => {
    dispatch(getSubCategory());
    }, []);

    return (
    <article className='flex items-start justify-between'>
      <table className='w-[410px]'>
        <thead className='border-b-[2px] h-[56px] border-[#E6E9F4]'>
          <tr>
            <th className='text-left text-[#5A607F]'>SubCategories</th>
            <th className='text-[#5A607F] text-end'>Action</th>
          </tr>
        </thead>
        <tbody>
          { subCategory.map((e) => {
            return (
              <tr key={e.id} className='border-b-[1px] h-[56px] border-[#E6E9F4]'>
                <td>{e.subCategoryName}</td>
                <td className='text-end'>
                  <BorderColorOutlinedIcon onClick={() => {
                    handleOpen()
                    setEditSubCategoryName(e.subCategoryName)
                    setEditSubCategoryId(e.id)
                  }} className="text-[#2563EB] cursor-pointer" />
                  <DeleteOutlineOutlinedIcon onClick={() => dispatch(deleteSubCategory(e.id))} className="text-[red] cursor-pointer" />
                </td>
              </tr>
            )})
          }
        </tbody>
      </table>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <article className='flex text-[20px] font-bold items-center justify-between'>
                  Edit subCategory
                  <CloseIcon onClick={handleClose} className='cursor-pointer' />
                </article>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField value={editSubCategoryName} onChange={e => setEditSubCategoryName(e.target.value)} label='Category name' className='w-full' />
                <article className='flex items-center mt-[20px] gap-[10px] justify-end'>
                  <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                  <Button variant='contained' onClick={() => {
                    addCategoryFunc()
                    handleClose()
                }}>Edit</Button>
              </article>
            </Typography>
          </Box>
        </Modal>
       <article className='w-[455px] text-end border-[#E5E5E5] border-[1px] p-[28px] rounded-[4px]'>
         <h2 className='mb-[24px] text-start text-[20px] font-bold'>Add new subCategory</h2>
         <TextField
          fullWidth
          label="Subcategory Name"
          variant="outlined"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
                label="SubCategories"
                className="text-start"
              >
                {
                  categories.map((e) => {
                    return (
                      <MenuItem key={e.id} value={e.id}>{e.categoryName}</MenuItem>
                    )
                  })
                }
              </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleAddSubCategory}
          sx={{ mt: 2 }}
        >
          Create
        </Button>
      </article>
    </article>
  );
};

export default SubCategory;

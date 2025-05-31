import React, { useEffect, useState } from 'react'
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { addBrands, deleteBrands, editBrands, getBrands } from '../../entities/api/brandsApi';
import { useDispatch, useSelector } from 'react-redux';
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

const BrandsTab = () => {
    const brand = useSelector((state) => state.brand.brands)
    const [brandName, setBrandName] = useState(""); 
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [editBrandName, setEditBrandName] = useState('')
    const [editBrandId, setEditBrandId] = useState('')
    
    useEffect(() => {
        dispatch(getBrands())
        setBrandName('')
    },[])

    function editBrandFunc() {
        let editBrand = {
            Id: editBrandId,
            BrandName: editBrandName 
        }
        dispatch(editBrands(editBrand))
    }

    return (
        <>
        <article className='flex items-start justify-between'>
                <table className='w-[410px]'>
                <thead className='border-b-[2px] h-[56px] border-[#E6E9F4]'>
                    <tr>
                    <th className='text-left text-[#5A607F]'>Brands</th>
                    <th className='text-[#5A607F] text-end'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    brand.map((e) => {
                        return (
                        <tr key={e.id} className='border-b-[1px] h-[56px] border-[#E6E9F4]'>
                            <td>{e.brandName}</td>
                            <td className='text-end'>
                                <BorderColorOutlinedIcon onClick={() => {
                                    setEditBrandName(e.brandName)
                                    setEditBrandId(e.id)
                                    handleOpen()
                                }
                                } className="text-[#2563EB] cursor-pointer" />
                                <DeleteOutlineOutlinedIcon onClick={() => dispatch(deleteBrands(e.id))} className="text-[red] cursor-pointer" />
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
                </table>
                <article className='w-[455px] h-[228px] text-end border-[#E5E5E5] border-[1px] p-[28px] rounded-[4px]'>
                    <article className='mb-[24px]'>
                        <h2 className='mb-[24px] text-start text-[20px] font-bold'>Add new brand</h2>
                        <TextField label='Brand name' value={brandName} onChange={(e) => setBrandName(e.target.value)} fullWidth />
                    </article>
                    <Button onClick={() => dispatch(addBrands(brandName))} variant='contained'>Create</Button>
                </article>
        </article>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <article className='flex text-[20px] font-bold items-center justify-between'>
                        Edit Brand
                        <CloseIcon onClick={handleClose} className='cursor-pointer' />
                    </article>
                </Typography>
                      
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <TextField value={editBrandName} onChange={e => setEditBrandName(e.target.value)} label='Brand name' className='w-full' />
                    <article className='flex items-center mt-[20px] gap-[10px] justify-end'>
                        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                        <Button variant='contained' onClick={async () => {
                            editBrandFunc()
                            handleClose()
                          }
                        }>Edit</Button>
                    </article>
                </Typography>
            </Box>
        </Modal>
        </>
    )
}

export default BrandsTab
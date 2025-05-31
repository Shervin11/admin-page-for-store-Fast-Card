import React, { useEffect, useState } from 'react'
import { Button, TextField } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { addBrands, deleteBrands, getBrands } from '../../entities/api/brandsApi';
import { useDispatch, useSelector } from 'react-redux';

const BrandsTab = () => {
    const brand = useSelector((state) => state.brand.brands)
    const [brandName, setBrandName] = useState(""); 
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getBrands())
        setBrandName('')
    },[])

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
                            <BorderColorOutlinedIcon className="text-[#2563EB] cursor-pointer" />
                            <DeleteOutlineOutlinedIcon onClick={() => dispatch(deleteBrands(e.id))} className="text-[red] cursor-pointer" />
                            </td>
                        </tr>
                        )
                    })
                    }
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
        </>
    )
}

export default BrandsTab
import { Button, FormControl, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { getColors } from '../../entities/api/colorsApi';
import { getSubCategory } from '../../entities/api/subCategoryApi';
import { getBrands } from '../../entities/api/brandsApi';
import { addProduct } from '../../entities/api/productsApi';

const AddProduct = () => {
  const dispatch = useDispatch()
  const colors = useSelector(state => state.color.colors)
  const subCategory = useSelector(state => state.subCategory.subCategory)
  const brands = useSelector(state => state.brand.brands)
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [addImage, setAddImage] = useState(null);
  const [addBrandId, setAddBrandId] = useState('');
  const [addColorId, setAddColorId] = useState('');
  const [addProductName, setAddProductName] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addQuantity, setAddQuantity] = useState('');
  const [addCode, setAddCode] = useState('');
  const [addPrice, setAddPrice] = useState('');
  const [addHasDiscount, setAddHasDiscount] = useState('');
  const [addSubCategoryId, setAddSubCategoryId] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageKey, setImageKey] = useState(null);
  const navigate = useNavigate()

  function handleAddImage(e) {
    const file = e.target.files[0]
    let reader = new FileReader()
    reader.onload = () => {
      setImagePreview(reader.result)
    }
    setImageKey(file)
    reader.readAsDataURL(file)
  }

  let addFunc = async (e) => {
    e.preventDefault()
    let form = new FormData()
    form.append('Images', imageKey)
    form.append('BrandId', addBrandId)
    form.append('ColorId', addColorId)
    form.append('ProductName', addProductName)
    form.append('Description', addDescription)
    form.append('Quantity', addQuantity)
    form.append('Code', addCode)
    form.append('Price', addPrice)
    form.append('HasDiscount', addHasDiscount)
    form.append('SubCategoryId', addSubCategoryId)
    await dispatch(addProduct(form))    
    navigate('/dash/products')
  }
  
  useEffect(() => {
    dispatch(getColors())
    dispatch(getSubCategory())
    dispatch(getBrands())
  }, [])

  return <>
  <article className='flex items-center justify-between'>
    <article className='flex items-center gap-[8px] text-[30px] font-bold'>
      <h2>Products</h2>
      <p>/</p>
      <h2>Add new</h2>
    </article>
    <article className='flex items-center gap-[10px]'>
      <Link to={'/dash/products'}>
        <Button className='w-[120px] h-[40px]' variant='outlined'>Cancel</Button>
      </Link>
    </article>
  </article>
  <section className='my-[40px]'>
    <form onSubmit={addFunc} className='flex items-start justify-between md:flex-row flex-col gap-[30px]'>
      <article>
        <h2 className='font-bold text-[16px]'>Information</h2>
        <article className='w-[580px]'>
          <article className='flex my-[16px] gap-[16px]'>
            <TextField value={addProductName} onChange={(e) => setAddProductName(e.target.value)} label='Product name' fullWidth />
            <TextField value={addCode} onChange={(e) => setAddCode(e.target.value)} label='Code' />
          </article>
          <article>
            <TextField label='Normal' fullWidth disabled />
            <TextField
              variant='filled'
              label="Description"
              multiline
              rows={5}
              className='w-full'
              value={addDescription} 
              onChange={(e) => setAddDescription(e.target.value)}
          />
          </article>

          <article className='flex gap-[16px] my-[40px]'>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={addSubCategoryId}
                label="SubCategories"
                onChange={(e) => setAddSubCategoryId(e.target.value)}
              >
                {
                  subCategory.map((e) => {
                    return (
                      <MenuItem key={e.id} value={e.id}>{e.subCategoryName}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Brands</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={addBrandId}
                label="Brands"
                onChange={(e) => setAddBrandId(e.target.value)}
              >
                 {
                  brands.map((e) => {
                    return (
                      <MenuItem key={e.id} value={e.id}>{e.brandName}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </article>

          <article>
            <h2 className='text-[16px] font-bold'>Price</h2>
            <article className='my-[16px] flex gap-[16px]'>
              <TextField
              id="outlined-number"
              label="Product price"
              value={addPrice} 
              onChange={(e) => setAddPrice(e.target.value)}
              type="number"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              />
              <TextField
              label="Discount"
              value={addHasDiscount} 
              onChange={(e) => setAddHasDiscount(e.target.value)}
              />
              <TextField
              id="outlined-number"
              label="Count"
              value={addQuantity} 
              onChange={(e) => setAddQuantity(e.target.value)}
              type="number"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              />
            </article>
            <article className='flex items-center gap-[5px]'>
              <Switch {...label} />
              <h3>Add tax for this product</h3>
            </article>
          </article>

        </article>
      </article>

      <article className='w-[347px]'>
        <article className='border-[1px] mb-[24px] border-[#D9E1EC] p-[20px] rounded-[4px]'>
          <h3 className='font-bold'>Colour:</h3>         
          <article className='flex flex-wrap mt-[20px] gap-[14px]'>
            {
              colors && colors.map((e) => {
                return (
                  <article 
                  onClick={() => setAddColorId(e.id)}
                  key={e.id} 
                  style={{backgroundColor: e.colorName}} 
                  className='cursor-pointer w-[40px] h-[40px] rounded-full border border-[#3a3333]'
                  > 
                  </article>
                )
              })
            }
          </article>
        </article>
        <h2 className='text-[16px] font-bold'>Images</h2>
        <input onChange={handleAddImage} multiple type="file" className='border my-[20px] rounded-[4px] p-[5px] w-full' />
        {
          imagePreview && (
            <article className='flex items-center gap-[50px]'>
              <img src={imagePreview} alt="image" className='w-[54px] h-[54px] rounded-[4px]' />
              <h2>{imageKey.name}</h2>
            </article>
          )
        }
      <article className='text-end'>
        <Button type='submit' className='w-[120px] h-[40px]' variant='contained'>Save</Button>
      </article>
      </article>
    </form>
  </section>
  </>
}

export default AddProduct
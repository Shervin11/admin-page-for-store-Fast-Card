import { Button, FormControl, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getColors } from '../../entities/api/colorsApi';
import { getSubCategory } from '../../entities/api/subCategoryApi';
import { getBrands } from '../../entities/api/brandsApi';
import { addProduct, editProduct, getProductById } from '../../entities/api/productsApi';
import API from '../../shared/config/api';

const EditProduct = () => {
    const dispatch = useDispatch()
    const colors = useSelector(state => state.color.colors)
    const product = useSelector(state => state.product.product)
    const subCategory = useSelector(state => state.subCategory.subCategory)
    const brands = useSelector(state => state.brand.brands)
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const [editBrandId, setEditBrandId] = useState('');
    const [editColorId, setEditColorId] = useState('');
    const [editProductName, setEditProductName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editQuantity, setEditQuantity] = useState('');
    const [editCode, setEditCode] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editHasDiscount, setEditHasDiscount] = useState('');
    const [editSubCategoryId, setEditSubCategoryId] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageKey, setImageKey] = useState(null);
    const navigate = useNavigate()
    const { id } = useParams()

    const findColor = colors.find((e) => e.colorName == product.color)
    const findSubCategory = subCategory.find((e) => e.id == product.subCategoryId)
    const findBrand = brands.find((e) => e.brandName == product.brand)

    function handleAddImage(e) {
      const file = e.target.files[0]
      let reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result)
      }
      setImageKey(file)
      reader.readAsDataURL(file)
    }
  
    let editProductFunc = async () => {
      let obj = {
        productName: editProductName,
        code: editCode,
        id: product.id,
        brandId: editBrandId,
        colorId: editColorId,
        description: editDescription,
        quantity: editQuantity,
        weight: '',
        size: '',
        price: editPrice,
        hasDiscount: editHasDiscount,
        subCategory: editSubCategoryId
      }
      dispatch(editProduct(obj))
      navigate('/dash/products')   
    }

    useEffect(() => {
      dispatch(getColors())
      dispatch(getSubCategory())
      dispatch(getBrands())
      dispatch(getProductById(id))
    }, [id])

    useEffect(() => {
      setEditProductName(product.productName)
      setEditCode(product.code)
      setEditDescription(product.description)
      setEditPrice(product.price)
      setEditQuantity(product.quantity)
      setEditHasDiscount(product.hasDiscount)
      if (findColor && findSubCategory) {
        setEditColorId(findColor.id)
        setEditSubCategoryId(findSubCategory.id)
        setEditBrandId(findBrand.id)
      }
    }, [product, findColor]  )
   
    return <>
    <article className='flex items-center justify-between'>
      <article className='flex items-center gap-[8px] text-[30px] font-bold'>
        <h2>Products</h2>
        <p>/</p>
        <h2>Edit</h2>
      </article>
      <article className='flex items-center gap-[10px]'>
        <Link to={'/dash/products'}>
          <Button className='w-[120px] h-[40px]' variant='outlined'>Cancel</Button>
        </Link>
      </article>
    </article>
    <section className='my-[40px] flex items-start justify-between md:flex-row flex-col gap-[30px]'>
        <article>
          <h2 className='font-bold text-[16px]'>Information</h2>
          <article className='w-[580px]'>
            <article className='flex my-[16px] gap-[16px]'>
              <TextField value={editProductName} onChange={(e) => setEditProductName(e.target.value)} label='Product name' fullWidth />
              <TextField value={editCode} onChange={(e) => setEditCode(e.target.value)} label='Code' />
            </article>
            <article>
              <TextField label='Normal' fullWidth disabled />
              <TextField
                variant='filled'
                label="Description"
                multiline
                rows={5}
                className='w-full'
                value={editDescription} 
                onChange={(e) => setEditDescription(e.target.value)}
            />
            </article>
  
            <article className='flex gap-[16px] my-[40px]'>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={editSubCategoryId}
                  label="SubCategories"
                  onChange={(e) => setEditSubCategoryId(e.target.value)}
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
                  value={editBrandId}
                  label="Brands"
                  onChange={(e) => setEditBrandId(e.target.value)}
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
                value={editPrice} 
                onChange={(e) => setEditPrice(e.target.value)}
                type="number"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                />
                <TextField
                label="Discount"
                type='number'
                />
                <TextField
                id="outlined-number"
                label="Count"
                value={editQuantity} 
                onChange={(e) => setEditQuantity(e.target.value)}
                type="number"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                />
              </article>
              <article className='flex items-center gap-[5px]'>
                <Switch
                value={editHasDiscount} 
                onChange={(e) => setEditHasDiscount(e.target.value)}
                {...label} />
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
                    onClick={() => setEditColorId(e.id)}
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
            product.images && product.images.map((e) => {
              return (
                <article key={e.id}>
                  <article className='flex items-center gap-[50px]'>
                    <img src={`${API}images/${e.images}`} alt="image" className='w-[54px] h-[54px] rounded-[4px]' />
                  </article>
                  {
                    imagePreview && (
                      <article className='flex items-center gap-[50px]'>
                        <img src={imagePreview} alt="image" className='w-[54px] h-[54px] rounded-[4px]' />
                        <h2>{imageKey.name}</h2>
                      </article>
                    )
                  }
                </article>
                )
              }) 
          }
        <article className='text-end'>
          <Button className='w-[80px] h-[40px]' onClick={editProductFunc} variant='contained'>Edit</Button>
        </article>
      </article>
    </section>
    </>
}

export default EditProduct  
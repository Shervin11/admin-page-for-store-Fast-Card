import PropTypes, { func } from 'prop-types';
import { Box, Button, Tab, Tabs, TextField } from "@mui/material";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, editCategory, getCategory } from '../../entities/api/categoryApi';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import API from '../../shared/config/api';
import CloseIcon from '@mui/icons-material/Close';
import BrandsTab from '../../shared/components/brandsTab';
import SubCategory from '../../shared/components/subCategories';

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

const Other = () => {
  const [value, setValue] = useState(0); 
  const categories = useSelector((state) => state.category.categories)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const [categoryImage, setCategoryImage] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [editCategoryName, setEditCategoryName] = useState('')
  const [editCategoryImage, setEditCategoryImage] = useState('')
  const [editCategoryId, setEditCategoryId] = useState('')
    
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getCategory()) 
  }, [])

  function addCategoryFunc() {
    let form = new FormData()
    form.append('CategoryImage', categoryImage)
    form.append('CategoryName', categoryName)
    dispatch(addCategory(form))
  }

  function handleEdit(e) {
    e.preventDefault()
    let form = new FormData()
    form.append('Id', editCategoryId)
    form.append('CategoryImage', editCategoryImage)
    form.append('CategoryName', editCategoryName)
    dispatch(editCategory(form))
  }

  return <>
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Categories" {...a11yProps(0)} />
            <Tab label="Brands" {...a11yProps(1)} />
            <Tab label="SubCategories" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <article className='flex items-center justify-between'>
          <TextField label='Search...' />
          <Button variant="contained" onClick={handleOpen}>+ Add new</Button>
          </article>
          <article className='flex items-center flex-wrap gap-[16px] mt-[24px]'>
            {categories.map((e) => {
              return (
                <article key={e.id} className='w-[182px] h-[144px] hover:bg-[#2563EB] text-[#2563EB] hover:border-transparent hover:text-[#FAFAFA] py-[24px] px-[20px] border-[1px] border-[#0000004D] rounded-[4px]'>
                  <article className='flex items-start justify-between'>
                    <img src={`${API}images/${e.categoryImage}`} className='w-[66px] rounded-[10px] h-[60px]' alt="image" />
                    <BorderColorOutlinedIcon className="cursor-pointer" onClick={() => {
                      setEditCategoryImage(e.categoryImage)
                      setEditCategoryName(e.categoryName)
                      setEditCategoryId(e.id)
                      handleEditOpen()
                    }} />
                  </article>
                  <h3 className='mt-[16px]'>{e.categoryName}</h3>
                </article>
              )
            })
            }
          </article>
        </CustomTabPanel>

          <Modal
            open={editOpen}
            onClose={handleEditClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <article className='flex text-[20px] font-bold items-center justify-between'>
                  Edit category
                  <CloseIcon onClick={handleEditClose} className='cursor-pointer' />
                </article>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form onSubmit={handleEdit}>
                <TextField value={editCategoryName} onChange={e => setEditCategoryName(e.target.value)} label='Category name' className='w-full' />
                <input type='file' onChange={(e) => setEditCategoryImage(e.target.files[0])} className='border-[1px] cursor-pointer border-[gray] w-full rounded-[4px] my-[20px] p-[5px]' />
                <article className='flex items-center gap-[10px] justify-end'>
                  <Button variant='outlined' type='button' onClick={handleEditClose}>Cancel</Button>
                  <Button variant='contained' type='submit' onClick={handleEditClose}>Edit</Button>
                </article>
                </form>
              </Typography>
            </Box>
          </Modal>
          
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <article className='flex text-[20px] font-bold items-center justify-between'>
                  Add category
                  <CloseIcon onClick={handleClose} className='cursor-pointer' />
                </article>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField value={categoryName} onChange={e => setCategoryName(e.target.value)} label='Category name' className='w-full' />
                <input type='file' onChange={(e) => setCategoryImage(e.target.files[0])} className='border-[1px] cursor-pointer border-[gray] w-full rounded-[4px] my-[20px] p-[5px]' />
                <article className='flex items-center gap-[10px] justify-end'>
                  <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                  <Button variant='contained' onClick={async () => {
                    await addCategoryFunc()
                    handleClose()
                  }
                  }>Create</Button>
                </article>
              </Typography>
            </Box>
          </Modal>
        <CustomTabPanel value={value} index={1}>
          <BrandsTab />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <SubCategory />
        </CustomTabPanel>
      </Box>
  </>;
};

export default Other;

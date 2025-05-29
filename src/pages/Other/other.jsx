import PropTypes from 'prop-types';
import { Box, Button, Tab, Tabs, TextField } from "@mui/material";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../entities/api/categoryApi';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import API from '../../shared/config/api';
import CloseIcon from '@mui/icons-material/Close';
import BrandsTab from '../../shared/components/brandsTab';

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

  return <>
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Categories" {...a11yProps(0)} />
            <Tab label="Brands" {...a11yProps(1)} />
            <Tab label="Banners" {...a11yProps(2)} />
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
                <article key={e.id} className='w-[182px] h-[144px] hover:bg-[#2563EB] text-[#2563EB] hover:text-[#FAFAFA] py-[24px] px-[20px] border-[1px] border-[#0000004D] rounded-[4px]'>
                  <article className='flex items-start justify-between'>
                    <img src={`${API}images/${e.categoryImage}`} className='w-[66px] rounded-[10px] h-[60px]' alt="image" />
                    <BorderColorOutlinedIcon className="cursor-pointer" />
                  </article>
                  <h3 className='mt-[16px]'>{e.categoryName}</h3>
                </article>
              )
            })
            }
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
                  Add category
                  <CloseIcon onClick={handleClose} className='cursor-pointer' />
                </article>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField label='Category name' className='w-full' />
                <input type='file' className='border-[1px] cursor-pointer border-[gray] w-full rounded-[4px] my-[20px] p-[5px]' />
                <article className='flex items-center gap-[10px] justify-end'>
                  <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                  <Button variant='contained'>Create</Button>
                </article>
              </Typography>
            </Box>
          </Modal>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <BrandsTab />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
  </>;
};

export default Other;

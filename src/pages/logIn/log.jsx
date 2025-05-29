import React, { useState } from 'react'
import logo from '/src/shared/images/logo.png'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { logFunc } from '/src/entities/api/logInApi.js';
import { useNavigate } from 'react-router-dom';

const Log = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = useState('')
  const [pass, setPass] = useState('') 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <section className='max-w-[1540px] flex items-center pr-[100px] justify-between m-auto'>
        <article className='bg-[#1C2536] pl-[64px] flex items-center w-[651px] h-[633px]'>
          <article>
            <h2 className='text-[#FAFAFA] text-[24px] font-bold'>Welcome to admin panel</h2>
            <img src={logo} alt="logo" />
          </article>
        </article>
        <article className='w-[400px]'>
          <h3 className='text-[#111927] text-[24px] font-bold'>Log in</h3>
          <article className='flex flex-col my-[20px] gap-[20px]'>
            <TextField value={name} onChange={(e) => setName(e.target.value)} id="outlined-basic" className='w-full' label="Name" variant="outlined" />
            <FormControl className='w-full' value={pass} onChange={(e) => setPass(e.target.value)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
                label="Password"
              />
            </FormControl>
          </article>
          <article className='flex flex-col gap-[10px]'>
            <Button className='w-full h-[52px]' variant="text">Forgot password?</Button>
            <Button onClick={() => {
                let obj = {
                  userName: name,
                  password: pass
                }
                dispatch(logFunc(obj))
                navigate('/dash')
              }}
              className='w-full h-[52px]' variant="contained">Log in</Button>
          </article>
        </article>
      </section>
    </>
  )
}

export default Log
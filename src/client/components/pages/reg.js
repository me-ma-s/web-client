import React, { useState } from 'react';
import styled from 'styled-components'

import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FilledInput } from '@material-ui/core';


import Avatar from '@material-ui/core/Avatar';

const AVA = styled(Avatar)`
  height : 30vh;
  width : 20vw;
  font-size : 50px;
  margin-bottom : 4vh;

`

const Screen = styled.div`
  width : 100vw;
  height : 100vh;
  background-color : white;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Root = styled.div`
  align-items: center;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height : 20%;
`;

const Reg = () => {

  const [ email , setEmail ] =  useState('')
  const [ name , setName ] =  useState('')
  const [ surname , setSurname ] =  useState('')

  return(
    <Screen>
      <Root>
        <AVA variant={'rounded'} >{ ((name.slice(0,1) || '')+(surname.slice(0,1) || '')) || 'I\'am'}</AVA>
        <FormControl>
          <InputLabel>Почта</InputLabel>
          <FilledInput value={email} onChange={(e)=>setEmail(e.target.value)}></FilledInput>
        </FormControl>
        <FormControl>
          <InputLabel>Имя</InputLabel>
          <FilledInput value={name} onChange={(e)=>setName(e.target.value)}></FilledInput>
        </FormControl>
        <FormControl>
          <InputLabel>Фамилия</InputLabel>
          <FilledInput value={surname} onChange={(e)=>setSurname(e.target.value)}></FilledInput>
        </FormControl>
      </Root>
    </Screen>
  )
}

export default Reg
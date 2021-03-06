import React, { useState } from 'react';
import styled from 'styled-components'

import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FilledInput } from '@material-ui/core';

import pict from '../../../client/icon.jpg'

import Button from '@material-ui/core/Button';
import {generateEmailPassHash} from '../../services/encryption/highLevelEncryption';
import { postQuery } from '../../services/query-service';

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
  width : 400px;
`;

const StForm = styled(FormControl)`
  width : 400px;
  & > label {
    padding-left : 10px;
  }
`;

const BtFotm = styled.div`
  margin-top : 20px;
  display : flex;
  width : 400px;
  justify-content: space-evenly;
`;

const MyIcon = styled.div`
  height : 280px;
  width : 200px;
  font-size : 70px;
  margin-bottom : 20px;
  background-image: url(${pict});
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
`

const Auto = () => {

  const [ email , setEmail ] =  useState('')
  const [ password , setPassword ] = useState('')

  const RegAct = (e) =>{
    if (e.key === 'Enter') {
      Act()
    }  
  }

  const Act = ()=>{
    postQuery('/logIn',
    {
      email,
      email_pass_hash:generateEmailPassHash(email,password),
    }
  )
    .then( (data)=>{if(data){console.log('user:',data)} } )
  }

  return(
    <Screen>
      <Root>
        <MyIcon/>
        <StForm>
          <InputLabel >Почта</InputLabel>
          <FilledInput value={email} onKeyUp={RegAct} onChange={(e)=>setEmail(e.target.value)} ></FilledInput>
        </StForm>
        <StForm>
          <InputLabel >Пароль</InputLabel>
          <FilledInput value={password} onKeyUp={RegAct} onChange={(e)=>setPassword(e.target.value)}></FilledInput>
        </StForm>
        <BtFotm>
          <Button onClick={Act} variant="outlined">Войти</Button>
          <Button variant="outlined">Регистрация</Button>
        </BtFotm>
      </Root>
    </Screen>
  )
}

export default Auto
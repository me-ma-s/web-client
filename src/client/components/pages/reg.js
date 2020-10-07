import React, { useState } from 'react';
import styled from 'styled-components'

import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FilledInput } from '@material-ui/core';

import {generateEmailPassHash} from '../../services/encryption/highLevelEncryption';


import Avatar from '@material-ui/core/Avatar';
import { postQuery } from '../../services/query-service';

const AVA = styled(Avatar)`
  height : 220px;
  width : 200px;
  font-size : 70px;
  margin-bottom : 20px;
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

const StForm = styled(FormControl)`
  width : 400px;
  & > label {
    padding-left : 10px;
  }
`;

const Reg = () => {

  const [ email , setEmail ] =  useState('')
  const [ name , setName ] =  useState('')
  const [ surname , setSurname ] =  useState('')
  const [ password , setPassword ] = useState('')
  const [ cm_password , setCm_password ] = useState('')

  const RegAct = (e) =>{
    if (e.key === 'Enter') {
      
      //TODO VALIDATION!!!

      postQuery('/postUser',
        {
          email,
          name,
          surname,
          email_pass_hash:generateEmailPassHash(email,password),
        }
      )
        .then( (data)=>{if(data){console.log('user:',data)} } )
    }
  }

  return(
    <Screen>
      <Root>
        <AVA variant={'rounded'} >{ ((name.slice(0,1) || '')+(surname.slice(0,1) || '')) || 'I\'am'}</AVA>
        <StForm>
          <InputLabel>Имя</InputLabel>
          <FilledInput value={name} onKeyUp={RegAct}  onChange={(e)=>setName(e.target.value)}></FilledInput>
        </StForm>
        <StForm>
          <InputLabel>Фамилия</InputLabel>
          <FilledInput value={surname} onKeyUp={RegAct}  onChange={(e)=>setSurname(e.target.value)}></FilledInput>
        </StForm>
        <StForm>
          <InputLabel>Почта</InputLabel>
          <FilledInput value={email} onKeyUp={RegAct} onChange={(e)=>setEmail(e.target.value)}></FilledInput>
        </StForm>
        <StForm>
          <InputLabel>Пароль</InputLabel>
          <FilledInput value={password} onKeyUp={RegAct} onChange={(e)=>setPassword(e.target.value)}></FilledInput>
        </StForm>
        <StForm>
          <InputLabel>Подтверждение пароля</InputLabel>
          <FilledInput value={cm_password} onKeyUp={RegAct} onChange={(e)=>setCm_password(e.target.value)}></FilledInput>
        </StForm>
      </Root>
    </Screen>
  )
}

export default Reg
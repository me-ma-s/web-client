import React, { useState } from 'react';
import styled from 'styled-components'

import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FilledInput } from '@material-ui/core';

import {generateEmailPassHash} from '../../services/encryption/highLevelEncryption';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
  const [ addPictureFlag, setAddPictureFlag ] = useState(false)
  const [ avatar , setAvatar ] = useState(null)

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

  const saveAvatar = (data) =>{
    setAvatar(data.target.files[0]);
    let preview = document.getElementById('IMG')
    let file    = data.target.files[0]
    let reader = new FileReader();

    reader.addEventListener("load", () => {
      preview.src = reader.result;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }

  }

  return(
    <Screen>
      <Root>
          <input
              accept="image/*"
              style={{ display: 'none' }}
              id="avatarLoader"
              multiple={false}
              type="file"
              onChange={saveAvatar}
            />
          <label htmlFor="avatarLoader">
            <AVA variant={'rounded'} onMouseEnter={()=>{setAddPictureFlag(true)}} onMouseLeave={()=>{setAddPictureFlag(false)}}> 
                <img id={'IMG'} src="" alt={``}/> 
              {  
                avatar ? null : ((name.slice(0,1) || '')+(surname.slice(0,1) || '')) || 'I\'am'                 
              }
            </AVA>
          </label>
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
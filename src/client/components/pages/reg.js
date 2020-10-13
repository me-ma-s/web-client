import React, { useState } from 'react';
import styled from 'styled-components'

import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FilledInput } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {generateEmailPassHash} from '../../services/encryption/highLevelEncryption';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import Avatar from '@material-ui/core/Avatar';
import { postQuery } from '../../services/query-service';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const AVA = styled(Avatar)`
  height : 240px;
  width : 180px;
  font-size : 70px;
  margin-bottom : 20px;
`

const Screen = styled.div`
  width : 98vw;
  height : 98vh;
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
  width : 450px;
  height : 100px;
  padding : 0px;
  & > label {
    font-size : 20px;
    padding-left : 20px;
    margin-top : ${props=>props.ctr === '' ? '0px' : '5px'};
  }
  & .MuiFormLabel-root.Mui-focused{
    color : #607d8b !important;
    margin-top : 5px;
  }
  & .MuiFormLabel-root.Mui-error{
    color : grey;
  }
  & > div {
    height : 60px;
    padding-left : 3px;
  }
  & .MuiFilledInput-underline.Mui-focused:after{
    border-bottom: 2px solid #607d8b !important;
  }
  & .MuiFilledInput-underline.Mui-error:after{
    border-bottom: 2px solid #ef5350 !important;
  }
`;

const Image = styled.img`
  width : auto;
  max-height : 100%;
  max-width : 100%;
  height: auto;
  z-index : 1;
`;

const StAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
  z-index : 2;
  font-size : inherit;
  text-align : center;
  width : 100%;
  color : rgba(240,240,240,1);
  align-self : center;
`;

const BackAddIcon = styled.div`
  z-index : 2;
  position : absolute;
  background-color : rgba(0,0,0,0.7);
  display : flex;
  width : 100%;
  height : 100%;
`;

const BtFotm = styled.div`
  margin-top : 20px;
  display : flex;
  width : 400px;
  justify-content: space-evenly;
`;

const StArrowRightIcon = styled(ChevronRightIcon)`
  color : ${ props => props.error === '' ? 'white' : '#ef5350'};
  position : absolute;
  font-size : 50px;
  left : -50px;
  top : 8px;
`;

const Reg = () => {

  const [ email , setEmail ] =  useState('')
  const [ name , setName ] =  useState('')
  const [ surname , setSurname ] =  useState('')
  const [ password , setPassword ] = useState('')
  const [ cm_password , setCm_password ] = useState('')
  const [ addPictureFlag, setAddPictureFlag ] = useState(false)
  const [ avatar , setAvatar ] = useState(null)
  const [ error , setError ] = useState({
    name : '',
    email : '',
    surname : '',
    password : '',
    password : '',
    cm_password : ''
  })
  const updateError = (obj) => {
    setError({...error,...obj})
  }

  const apiBase = `${window.location.protocol}//${window.location.host}`;

  const RegAct = (e) =>{
    if (e.key === 'Enter') {
      if (name === ''){setError({name : 'Введите имя'})}
      if (email === ''){setError({email : 'Введите почтовый адрес'})}
      if (surname === ''){setError({surname : 'Введите фамилию'})}
      if (password === ''){setError({password : 'Введите пароль'})}
      if (cm_password === ''){setError({cm_password : 'Введите подтверждающий пароль'})}
      CreateUser()
    }
  }

  const CreateUser = () => {
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

  const saveAvatar = (data) =>{

    if (data.target.files[0] !== undefined){
      setAvatar(data.target.files[0]);
    } 
    
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
              <Image id={'IMG'} src="" alt={``}/> 
              {  
                avatar ? null : ((name.slice(0,1) || '')+(surname.slice(0,1) || '')) || '3x4'                 
              }
              {
                addPictureFlag
                ?
                <BackAddIcon>
                  <StAddCircleOutlineIcon/>
                </BackAddIcon>
                : null
              }
            </AVA>
          </label>
        <StForm error={error.name !== ''}  ctr={name}> 
          <StArrowRightIcon error={error.name}/>
          <InputLabel>Имя</InputLabel>
          <FilledInput value={name} onKeyUp={RegAct}  onChange={(e)=>{setName(e.target.value);updateError({name:''})}}></FilledInput>
        </StForm>
        <StForm error={error.surname !== ''}   ctr={surname}>
          <StArrowRightIcon error={error.surname}/>
          <InputLabel>Фамилия</InputLabel>
          <FilledInput value={surname} onKeyUp={RegAct}  onChange={(e)=>{setSurname(e.target.value);updateError({surname:''})}}></FilledInput>
        </StForm>
        <StForm error={error.email !== ''}  ctr={email}>
          <StArrowRightIcon error={error.email}/>
          <InputLabel>Почта</InputLabel>
          <FilledInput value={email} onKeyUp={RegAct} onChange={(e)=>{setEmail(e.target.value);updateError({email:''})}}></FilledInput>
        </StForm>
        <StForm error={error.password !== ''} ctr={password}>
          <StArrowRightIcon error={error.password}/>
          <InputLabel>Пароль</InputLabel>
          <FilledInput value={password} onKeyUp={RegAct} onChange={(e)=>{setPassword(e.target.value);updateError({password:''})}}></FilledInput>
        </StForm>
        <StForm error={error.cm_password !== ''} ctr={cm_password}>
          <StArrowRightIcon error={error.cm_password}/>
          <InputLabel>Подтверждение пароля</InputLabel>
          <FilledInput value={cm_password} onKeyUp={RegAct} onChange={(e)=>{setCm_password(e.target.value);updateError({cm_password:''})}}></FilledInput>
        </StForm>
        <BtFotm>
          <Button variant="outlined" href={`${apiBase + '/authorization' }`} >Вернуться  </Button>
          {
            (name !== '' && email !== '' && surname !== '' &&  password !== '' && cm_password !== '')
            ?
            <Button onClick={CreateUser} variant="outlined">Регистрация</Button>
            :
            null
          }
        </BtFotm>
      </Root>
    </Screen>
  )
}

export default Reg
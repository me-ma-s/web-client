import React, { useState , useEffect} from 'react';
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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { ClickAwayListener } from '@material-ui/core';
import { MenuList } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { ErrorOutlineOutlined } from '@material-ui/icons';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorIcon from '@material-ui/icons/Error';

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

const StList = styled(List)`
  position : absolute;
  right : 20px;
  font-size : 20px;
  padding : 0;
  margin : 0;
  top : 10px;
  border : solid 1px lightgrey;
  border-radius: 4px;
`;

const StMenuList = styled(MenuList)`
  position : absolute;
  right : 20px;
  z-index : 100;
  font-size : 20px;
  padding : 0;
  margin : 0;
  top : 52px;

`;

const StListItem = styled(ListItem)`
  border : solid 1px lightgrey;
  border-radius: 4px;
  width : 400px;
  background-color : white;
  :hover{
    opacity : 1;
    background-color : rgba(222,222,222,1);
  }
`;

const StErrorOutlineIcon = styled(ErrorOutlineOutlined)`
  margin-right : 15px;
`;

const StCheckCircleOutlineIcon = styled(CheckCircleOutlineIcon)`
  margin-right : 15px;
`;


const Reg = () => {

  const [ email , setEmail ] =  useState('')
  const [ name , setName ] =  useState('')
  const [ surname , setSurname ] =  useState('')
  const [ password , setPassword ] = useState('')
  const [ cm_password , setCm_password ] = useState('')
  const [ notification , setNotification ] = useState([]);
  const [ menu ,setMenu ] = useState(false)
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

  useEffect(()=>{
    let tmp = []
    for (const key in error) {
      if (error[key] !== ''){
        tmp.push({type : 'error', error_key : key, body : error[key]})
      }
    }
    setNotification([...notification.filter((el)=>(el.type !== 'error')),...tmp])
  },[error])

  const apiBase = `${window.location.protocol}//${window.location.host}`;

  const RegAct = (e) =>{
    if (e.key === 'Enter') {
      let stop = false;
      let tmp = {
        name : '',
        email : '',
        surname : '',
        password : '',
        password : '',
        cm_password : ''
      }
      if (name === ''){tmp.name = 'Введите имя'; stop = true}
      if (email === ''){tmp.email = 'Введите почтовый адрес'; stop = true}
      if (surname === ''){tmp.surname = 'Введите фамилию'; stop = true}
      if (password === ''){tmp.password = 'Введите пароль'; stop = true}
      if (cm_password === ''){tmp.cm_password = 'Введите подтверждающий пароль'; stop = true}
      setError({...error,...tmp})
      if (!stop){
        CreateUser()
      }
    }
  }

  const updateError = (obj) => {
    setError({...error,...obj})
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
        .then( (data)=>{
          if(data){
            if(data.error == undefined){
              setNotification([...notification,{type : 'note', body : 'Регистрация прошла успешно'}])
            } else {
              setNotification([...notification,{type : 'serv_err', body : 'Произошла ошибка, поробуйте позже'}])
            }
          } 
        })
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
      setNotification([...notification,{type : 'note', body : 'Изображение успешно загружено'}])
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const deleteItem = (tag) => {
    let obj = {}
    obj[tag] = ''
    setError({...error,...obj})
  }

  const deleteElement = (id) => {
    let test = notification.filter((el,id_el)=>(id!==id_el))
    setNotification(test)
  }


  const notToList = (el,id)=>{
    switch (el.type){
      case 'error' :
        return(
          <StListItem onClick={()=>{deleteItem(el.error_key)}} button key={id}>
            <StErrorOutlineIcon fontSize="inherit" />
            {el.body}
          </StListItem>
        )
      case 'serv_err' : 
        return(
          <StListItem onClick={()=>{deleteElement(id)}} button key={id}>
            <ErrorIcon fontSize="inherit" />
            {el.body}
          </StListItem>
        )
      default : 
        return(
          <StListItem onClick={()=>{deleteElement(id)}} button key={id}>
            <StCheckCircleOutlineIcon fontSize="inherit" />
            {el.body}
          </StListItem>
        )
    }
  }

  return(
    <Screen>
      <StList>
        <ListItem button onClick={()=>{if (notification.length !== 0) {setMenu(!menu)} else{setMenu(false)} }}> 
          {`Уведомления : ${notification.length == 0 ? 0 : notification.length }`} 
        </ListItem>
      </StList>
      {
        menu
        ?
        <StMenuList >
          {notification.map(notToList)}
        </StMenuList>
        :
        null
      }
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
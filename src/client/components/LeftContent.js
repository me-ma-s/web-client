import React, {useState,useEffect} from 'react';
import styled from 'styled-components'
import Header from './header'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { getQuery, postQuery } from '../services/query-service'
import { generateChannelKey , step1_genKeyPair, step1_genBody, generatePwdKey, encryptChannelKey, decryptChannelKey, step1_genInvitation} from '../services/encryption/highLevelEncryption';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { FormControl } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import ChannelsList from './ChannelsList'
import { connect } from 'react-redux';
import {setChannels,dropChannels,updateChannels} from '../actions/channels'
import DoneIcon from '@material-ui/icons/Done';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { generateIv } from '../services/encryption/lowLevelEncryption';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";



const StSettingsIcon = styled(SettingsIcon)`
  font-size : inherit;
  :hover{
    color : #42a5f5;
  }
`;

const StCheckIcon = styled(CheckIcon)`
  font-size : inherit;
  :hover{
    color : #66bb6a;
  }
`;

const StCloseIcon = styled(CloseIcon)`
  font-size : inherit;
  :hover{
    color : #ef5350;
  }
`;

const StFormControl = styled(FormControl)`
  width : 65%;
  padding : 0px 10px;
  & .MuiFormLabel-root{
    padding : 0px 10px;
  }
  & .MuiFormLabel-root.Mui-focused{
    color : ${props => props.myer };
    padding : 0px 10px;
  }
  & .MuiInput-underline.Mui-focused:after{
    border-bottom: 2px solid grey !important;
    padding : 0px 10px;
  }
`;

const TabsPlace = styled.div`
  flex-direction: row;
  margin : 0;
  padding : 0;
  display : flex;
  color: #607d8b;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px -1px, rgba(0, 0, 0, 0.1) 0px 1px 1px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  background-color : #f5f5f5;
`;

const FixedPart = styled.div`
  height : ${props=>props.stt + 'px'};
`;

const ListPart = styled.div`
  flex-direction: column;
  overflow-y : auto;
`;

const AddPlace = styled.div`
  height : 60px;
  border : 1px solid lightgrey;
  border-bottom : 2px solid lightgrey;
  background-color : rgba(200,200,200, 0.2);
  display: flex;
  align-items: center !important;
  align-items: center;
  justify-content: space-between;
  padding-left : 16px;
  padding-right : 16px;
`;

const StAddIcon = styled(AddIcon)`
  height : 35px;
  width : 35px;
  align-self : center;
  margin : 0px 5px;
  :hover{
    height : 43px;
    width : 43px;
    color : #546e7a;
    margin: 0px 1px;
    transition-property: height color, width;
    transition-timing-function: cubic-bezier(0.1, 0.9, 0.1, 1);
    transition-duration: 100ms;
    transition-delay: 0ms;
  }
`;


const StIcBt = styled(IconButton)`
  display : flex;
  margin : 0;
  padding : 0;
  align-item : center;
  max-width : 45px;
  :hover{
    background-color: rgba(0, 0, 0, 0.00);
  }
`;

const AddIconArea = styled.div`
  border : solid 1px lightgrey;
  margin : 0;
  padding : 0;
  display : flex;
  align-item : center;
`;

const Root = styled.div`
  display : flex;
  overflow : none;
  flex-direction: column;
  height : 100%;
`;

const ContactPlace = styled.div`
  background-color : rgba(240,240,240,0.1);
  overflow : none;
  flex-direction: column;
  height : ${props=>props.stt + 'px'};
  width : 100%;
`
const PersonalPlace = styled.div`
  background-color : rgba(240,240,240,0.1);
  overflow : none;
  flex-direction: row;
  height : ${props=>props.stt + 'px'};
  width : 100%;
`

const InputPlace = styled.div`
  width : 100%;
  display : flex;
  height : 50%;
`;

const InputPlaceCC = styled.div`
  width : 100%;
  display : flex;
  height : 100%;
`;


const StTabs = styled(Tabs)`
  width : calc( 100% - 45px);
  background-color : #f5f5f5;
  & > div{
    & > div{
      & > button{
        min-width : 50% !important;
        color : #9e9e9e;
        font-size : 16px;
        opacity : 1 !important;
        border : solid 1px rgba(0,0,0,0.1);
      }
      & .Mui-selected{
        color :  #1976d2;
      }
    }
    & > span{
      width : 50%  !important;
      background-color :  #1976d2;
      height : 3px;
    };
  }
`;


const StAvatar = styled(Avatar)`
  background : ${props => props.cl};
  color : white;
`;


const MiniBox = styled.div`
  display:flex;
  width : 96px !important;
  align-items: center;
  padding : 0;
  margin : 0;
  justify-content: space-between;
  :hover{
    background-color : none;  
  }
  transition-property: justify-content, background-color ;
  transition-timing-function: cubic-bezier(0.0, 0.0, 1, 1);
  transition-duration: 100ms;
  transition-delay: 0ms;
`;

const StListSubheader = styled.div`
  font-size : 25px;
  height: 25px;
  align-items: center;
  padding : 0px 2px !important;
  color : grey;
  :hover{
    background-color : rgba(200,200,210,0);
    font-size : 32px;
    color : #546e7a;
    transition-property: font-size, color, padding-right, vertical-align , align-self,text-align ;
    transition-timing-function: cubic-bezier(0.0, 0.0, 1.0, 0.1);
    transition-duration: 100ms;
    transition-delay: 0ms;
  }
`
const StMenu = styled(Menu)`
  color : green;
  width : 100%;
`;

const StMenuItem = styled(MenuItem)`
  padding: 0px 10px;
  margin : 0;
  & > svg {
    padding-right : 10px;
  }
`;

const MiniContainer = styled.div`
  width : 10%;
  background-color : rgba(0,0,0,0.02);
  align-items: center;
  display : flex;
  justify-content: center;
  border-bottom : solid 2px lightgrey;
  border-left : solid 2px lightgrey;
  border-right : solid 1px lightgrey;
  height : calc(100% - 2px);
`;

const MaxiContainer = styled.div`
  width : 90%;
  background-color :white;
`;


const PersonInput = styled(TextField)`
  width : 90%;
  height : ${props=>props.stt/2 + 'px'};
  direction: rtl;
  & > div{
    height : 60px;
    background-color : white !important;
    border-radius: 0px;
    & .MuiInput-underline:before {
      border-bottom: none;
    }
      & > input{
        direction: ltr;
        padding : 0px 5%;
        font-size : 18px;
        color: black ;
        outline : none !important;
      }
      &:after {
        border-bottom: solid 2px #1976d2;
      }
  }
`;

const StPerIcBt = styled(IconButton)`
  padding : 5px;
  font-size : 24px;
  color : black;
`; 


const LeftContent = ({timer,change_channels,setChannels,dropChannels,updateChannels}) => {

  const [ tabsState , updateTabsState ] = useState(false)
  const [ searchState , updateSearchState] = useState('')
  const [ current_channel , set_current_channel ] = useState(
    { key : 0,
      id : 0
    }
  )
  const [ addListElement , setAddListElement ] = useState(0);
  const [ channelName , setChannelName ] = useState('');
  const [ label , setLabel ] = useState('Название канала');
  const [ invite_key , setInvite_key] = useState('Генерируем новый ключ...');
  const [ personalMenu, setPersonalMenu ] = React.useState(0);
  const [ contactMenu,  setContactMenu] = useState(0);
  const userKey = localStorage.getItem("user_key")
  const history = useHistory();

  useEffect(()=>{
    getQuery('/getAllChannels')
    .then( (data) => data.map((el)=>{
      el.channelKey = decryptChannelKey(el._channel_key, userKey, el.iv);
      delete el._channel_key;
      return el;
    }))
    .then((data)=>{
      if (data != null){
        setChannels(data)
      } else {
        console.log('DATA_CHANNELS:',data)
      }
    })
  },[])

  const AddChannel = () => {
    if( channelName === ''){ 
      setLabel('Введите имя');
    }
    else {
      const channelKey = generateChannelKey();
      const iv = generateIv();
      //console.log('DEBUG::',{channelKey,userKey,iv})
      const _channel_key = encryptChannelKey(channelKey,userKey,iv)
      postQuery('/postChannel',{ name : channelName,iv, _channel_key})
        .then( (data)=>{ if (data !== null ) {if (data.error !== undefined){setLabel('Ошибка');}  else {
          setChannelName('');
          setLabel('Название канала');
          getQuery('/getAllChannels')
          .then( (data) => data.map((el)=>{
            el.channelKey = decryptChannelKey(el._channel_key, userKey, el.iv);
            delete el._channel_key;
            return el;
          }))
          .then(
            (data)=>{
              if (data != null){
                setChannels(data)
              } else {
                (console.log('DATA_CHANNELS:',data))
              }
              })
        }}})
    }
  }

  const generateInviteText = async () => {
    const keyPair  = await step1_genKeyPair();
    const postBody = step1_genBody(userKey,keyPair);
    const erza = await postQuery('/firstStep',postBody);
    const invite_text = step1_genInvitation(erza,keyPair);
    setInvite_key(invite_text)
  }

  useEffect(()=>{
    if (contactMenu == 0 ){
      setInvite_key('Генерируем ключ :)')
      generateInviteText()
    }
  },[contactMenu])

  const openContactMenu = () => {
    contactMenu==0?setContactMenu(80):setContactMenu(0);
    setPersonalMenu(0);
  };

  const openPersonalMenu = () => {
    personalMenu==0?setPersonalMenu(40):setPersonalMenu(0);
    setContactMenu(0)
  };

  const setSearchState = ( text ) => {
    updateSearchState(text)
  }
  useEffect(()=>{
    change_channels(current_channel)
  },[current_channel])

  const exitFromChat = ()=>{
    change_channels({
      id : 0,
      key :0
    })
    clearInterval(timer)
    getQuery('/logOut')
    localStorage.removeItem("user_key")
    history.push("/authorization");
  }

  return ( 
    <Root>
      <FixedPart stt={110+addListElement+contactMenu+personalMenu} >
        <Header page='Left' cb={setSearchState} personMenu={openPersonalMenu} contactMenu={openContactMenu} />
        {
          contactMenu != 0
          ?
          <ContactPlace stt={contactMenu}>
            <InputPlace>
              <PersonInput stt={contactMenu} placeholder={'Введите код приглашения'} key={1} variant="filled" />
              <MiniContainer>
                <StPerIcBt>
                  <DoneIcon fontSize='inherit'/>
                </StPerIcBt>
              </MiniContainer>
            </InputPlace> 
            <InputPlace> 
              <PersonInput stt={contactMenu} value={invite_key} onChange={null} key={2} variant="filled" />
              <MiniContainer>
                <StPerIcBt>
                  <FileCopyIcon fontSize='inherit'/>
                </StPerIcBt>
              </MiniContainer>
            </InputPlace>
          </ContactPlace>
          :
          null
        }
        {
          personalMenu != 0
          ?
          <PersonalPlace stt={personalMenu}>
            <InputPlaceCC>
              <MaxiContainer>
                Anime
              </MaxiContainer>
              <MiniContainer>
                <StPerIcBt onClick={exitFromChat} >
                  <ExitToAppIcon fontSize='inherit'/>
                </StPerIcBt>
              </MiniContainer>
            </InputPlaceCC>
          </PersonalPlace>
          :
          null
        }
        <TabsPlace>
          <AddIconArea>
            <StIcBt onClick={()=>setAddListElement(addListElement==60?0:60)}>
              <StAddIcon />
            </StIcBt>
          </AddIconArea>
          <StTabs
            value={tabsState}
            onChange={(e,val)=>{updateTabsState(val)}}
          >
            <Tab label="Каналы" value={false} />
            <Tab label="Папки"  value={true} />
          </StTabs>
        </TabsPlace>
        <Divider/>
        {
          addListElement!=0
          ?
          <AddPlace> 
            <StAvatar variant={'rounded'} cl='grey'> 
                ???
            </StAvatar>
            <StFormControl myer={ label !== 'Название канала' ? '#ef5350' : '#607d8b' } >
              <InputLabel error={label!=='Название канала'} > {label} </InputLabel>
              <Input value={channelName} onChange={(e)=>{setChannelName(e.target.value)}}/>
            </StFormControl>
            <MiniBox>
              <StListSubheader onClick={(e)=>{e.stopPropagation(); e.preventDefault();AddChannel();setAddListElement(60)}}>
                <StCheckIcon/>
              </StListSubheader>
              <StListSubheader onClick={(e)=>{e.stopPropagation(); e.preventDefault();setChannelName('');setLabel('Название канала');setAddListElement(0)}}>
                <StCloseIcon/>
              </StListSubheader>
              <StListSubheader onClick={(e)=>{e.stopPropagation(); e.preventDefault();}}>
                <StSettingsIcon/>
              </StListSubheader>
            </MiniBox>
            <Divider/>
          </AddPlace>
          :
          null
        }
      </FixedPart>
      <ListPart stt={addListElement} >
        { tabsState 
          ?
          null
          :
          <ChannelsList searchWord={searchState} ch={addListElement} cb={set_current_channel} addCh={setAddListElement}/>
        }
      </ListPart>
    </Root>
  )
}

export default connect(null,{
  setChannels,
  dropChannels,
  updateChannels,
})(LeftContent)
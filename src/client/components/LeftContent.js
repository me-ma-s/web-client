import React, {useState,useEffect} from 'react';
import styled from 'styled-components'
import Header from './header'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { FilledInput, InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { getQuery, postQuery } from '../services/query-service'
import { generateChannelKey , step1_genKeyPair, step1_genBody} from '../services/encryption/highLevelEncryption';
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
import HowToRegIcon from '@material-ui/icons/HowToReg';
import DoneIcon from '@material-ui/icons/Done';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import FileCopyIcon from '@material-ui/icons/FileCopy';



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
  height : ${props=>props.stt ? '170px' : '110px'};
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

`;

const StMenuItem = styled(MenuItem)`
  padding: 0px 10px;
  & > svg {
    padding-right : 10px;
  }
`;

const PersonInput = styled(TextField)`
  width : 280px;
  height : 30px;
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
        border-bottom: none;
      }
  }
`;

const StPerIcBt = styled(IconButton)`
  padding : 0;
  margin-left : 10px;
  color : black;
`; 


const LeftContent = ({changeChannels,setChannels,dropChannels,updateChannels}) => {

  const [ tabsState , updateTabsState ] = useState(false)
  const [ searchState , updateSearchState] = useState('')
  const [ currentId , setCurrentId ] = useState(null)
  const [ addListElement , setAddListElement ] = useState(false);
  const [ channelName , setChannelName ] = useState('');
  const [ label , setLabel ] = useState('Название канала');
  const [ invite_key , setInvite_key] = useState('');
  const [ blocker , setBlocker ] = useState(false);

  useEffect(()=>{
    getQuery('/getAllChannels').then((data)=>{if (data !== null){setChannels(data)} else (console.log('DATA_CHANNELS:',data))})
  },[])

  const AddChannel = () => {
    setBlocker(true)
    if( channelName === ''){ 
      setLabel('Введите имя');
      setBlocker(false)
    }
    else {
      postQuery('/postChannel',{ name : channelName, _channel_key: generateChannelKey()})
        .then( (data)=>{ if (data !== null ) {if (data.error !== undefined){setLabel('Ошибка');setBlocker(false)}  else {
          setChannelName('');
          setLabel('Название канала');
          getQuery('/getAllChannels')
          .then(
            (data)=>{
              if (data !== null){
                setChannels(data)
              } else {
                (console.log('DATA_CHANNELS:',data))
              }
              })
        }}})
    }
    setBlocker(false)
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
    
    //let keyPair = step1_genKeyPair();
    //let body = step1_genBody();

    setInvite_key('')
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };


  const setSearchState = ( text ) => {
    updateSearchState(text)
  }
  useEffect(()=>{
    changeChannels(currentId)
  },[currentId])

  return ( 
    <Root>
      <FixedPart stt={addListElement} >
        <Header page='Left' cb={setSearchState} person={openMenu}/>
        <StMenu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          getContentAnchorEl={null}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={closeMenu}
        >
          <StMenuItem>
            <PersonInput placeholder={'Введите код приглашения'} key={1} variant="filled" />
            <StPerIcBt>
              <DoneIcon fontSize='inherit'/>
            </StPerIcBt>
          </StMenuItem>
          <StMenuItem>
            <PersonInput value={invite_key} onChange={null} key={2} variant="filled" />
            <StPerIcBt>
              <FileCopyIcon fontSize='inherit'/>
            </StPerIcBt>
          </StMenuItem>
        </StMenu>
        <TabsPlace>
          <AddIconArea>
            <StIcBt onClick={()=>setAddListElement(!addListElement)}>
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
          addListElement
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
              <StListSubheader onClick={(e)=>{e.stopPropagation(); e.preventDefault();AddChannel();setAddListElement(true)}}>
                <StCheckIcon/>
              </StListSubheader>
              <StListSubheader onClick={(e)=>{e.stopPropagation(); e.preventDefault();setChannelName('');setLabel('Название канала');setAddListElement(false)}}>
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
          <ChannelsList searchWord={searchState} ch={addListElement} cb={setCurrentId} addCh={setAddListElement}/>
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
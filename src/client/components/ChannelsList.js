import React, {useState,useEffect} from 'react';
import styled from 'styled-components'
import { getQuery, postQuery } from '../services/query-service'
import { connect } from 'react-redux';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';


import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';



const StLst = styled(List)`
  margin : 0;
  padding : 0;
`
const YellowBack = styled.span`
  background-color : #fff59d;
  font-size : 21px;
`;

const StT = styled(Typography)`
  font-size : 18px;
`;

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

const StListItem = styled(ListItem)`
  :hover{
    background-color : rgba(100,100,120,0);
    & > li{
      background-color : transparent;
    }
  }
  & > li{
    background-color : transparent;
  }
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.0, 0.0, 1.0, 1.0);
  transition-duration: 150ms;
  transition-delay: 0ms;
`
const MiniBox = styled.div`
  display:flex;
  width : 96px !important;
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

const StListSubheader = styled(ListSubheader)`
  font-size : 25px;
  padding : 0px 2px !important;
  color : #607d8b;
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

const StAvatar = styled(Avatar)`
  background : ${props => props.cl};
  color : white;
`;

const StFormControl = styled(FormControl)`
  width : 95%;

`;


const ChannelsList = ({searchWord,cb,addCh,ch,channels}) => {
  
  
  const [ colorSet, setColorSet ] = useState({});
  const updateColorSet = ( obj ) => {
    for ( let key in obj){
      if ( colorSet[key] === undefined){
        setColorSet({...colorSet,...{[key]:ColorArray[Math.floor(Math.random() * (ColorArray.length + 1))]}})
      }
    }
  }


  const ColorArray=[
     '#f44336',
     '#d32f2f',
     '#ff1744',
     '#c51162',
     '#ff4081',
     '#880e4f',
     '#d81b60',
     '#ec407a',
     '#ab47bc',
     '#7b1fa2',
     '#4a148c',
     '#d500f9',
     '#aa00ff',
     '#6200ea',
     '#7c4dff',
     '#5e35b1',
     '#304ffe',
     '#536dfe',
     '#3949ab',
     '#2979ff',
     '#2196f3',
     '#00b0ff',
     '#00e5ff',
     '#0097a7',
     '#26a69a',
     '#00796b',
     '#1de9b6',
     '#66bb6a',
     '#2e7d32',
     '#00c853',
     '#7cb342',
     '#33691e',
     '#cddc39',
     '#9e9d24',
     '#f57f17',
     '#fdd835',
     '#ffc107',
     '#ff6f00',
     '#fb8c00',
     '#ff6d00',
     '#dd2c00',
     '#ff5722',
     '#6d4c41',
     '#546e7a'
  ]


  

  const ChannelElement = (el)=>{
    let posArray=[];

    updateColorSet({
      [el.name] : ColorArray[Math.floor(Math.random() * (ColorArray.length + 1))]
    })

    if ( searchWord === '') {
      posArray=[{
        textToken : el.name,
        textColor : false
      }]
    } else {
      let pos = el.name.toLowerCase().indexOf(searchWord.toLowerCase())
      let name = el.name;
      if (pos == -1){
        posArray=[{
          textToken : el.name,
          textColor : false
        }]
      } else {
        while( pos !== -1){
          posArray.push({
            textToken : name.slice(0,pos),
            textColor : false
          })
          posArray.push({
            textToken : name.slice(pos,pos + searchWord.length),
            textColor : true
          })
          name=name.slice(pos + searchWord.length, name.length)
          pos=name.toLowerCase().indexOf(searchWord.toLowerCase())
        }
        posArray.push({
          textToken : name,
          textColor : false
        })
      }
      
    }
    


    return(
      [
        <StListItem button={true} onClick={()=>{cb({ id : el.id,key : el.channelKey})}} key={el.id}>
            <ListItemAvatar>
              <StAvatar variant={'rounded'} cl={colorSet[el.name]} src={el.avatar_url}> 
                {el.name.slice(0,2)}
              </StAvatar>
            </ListItemAvatar>
            <ListItemText>
              <StT>
                { posArray.map( (elem,index)=>!elem.textColor? elem.textToken : <YellowBack  key={index}>{elem.textToken}</YellowBack>)}
              </StT>
            </ListItemText>
            <StListSubheader onClick={(e)=>{e.stopPropagation(); e.preventDefault();console.log('ItME')}}>
              <StSettingsIcon/>
            </StListSubheader>
        </StListItem>,
        <Divider key={`Divider${el.id}`}/>
      ]
    )
  }

  const SortElement = (el1,el2)=>{
    if (el1.name > el2.name) return 1; 
    if (el1.name == el2.name) return 0; 
    if (el1.name < el2.name) return -1;
  }

  const SortElementWithSW = (el1,el2)=>{
    let pos1 = el1.name.toLowerCase().indexOf(searchWord.toLowerCase())
    let pos2 = el2.name.toLowerCase().indexOf(searchWord.toLowerCase())
    let tmppos1 = pos1 == -1 ? 999999999 : pos1;
    let tmppos2 = pos2 == -1 ? 999999999 : pos2;
    if (tmppos1  > tmppos2) return 1; 
    if (tmppos1 == tmppos2) {
      SortElement(el1,el2)
    }
    if (tmppos1 < tmppos2) return -1;
  }


  return(
    <StLst>
      { channels.sort( (el1,el2)=> searchWord == '' ? SortElement(el1,el2) : SortElementWithSW(el1,el2))
              .map( (el)=>ChannelElement(el)) }
    </StLst>
  )
}

export default  connect(
  (store)=>({
  channels : store.channels
})
)(ChannelsList)

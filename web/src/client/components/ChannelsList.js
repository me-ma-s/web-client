import React, {useState,useEffect} from 'react';
import styled from 'styled-components'
import { getQuery } from '../services/query-service'

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';


const StLst = styled(List)`
  margin : 0;
  padding :0;
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
`;

const StListItem = styled(ListItem)`
  :hover{
    background-color : rgba(0,0,0,0.05);
    & > li{
      background-color : transparent;
    }
  }
  & > li{
    background-color : transparent;
  }
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.1, 0.1, 0.1, 1);
  transition-duration: 150ms;
  transition-delay: 0ms;
`
const StListSubheader = styled(ListSubheader)`
  font-size : 25px;
  align-self: center;
  vertical-align: middle;
  color : #607d8b;
  :hover{
    background-color : rgba(0,0,0,0.1);
    font-size : 32px;
    color : #757575;
    align-self: center;
    vertical-align: middle;
    transition-property: font-size, color ;
    transition-timing-function: cubic-bezier(0.1, 0.9, 0.1, 1);
    transition-duration: 100ms;
    transition-delay: 0ms;
  }
`



const ChannelsList = ({searchWord,cb}) => {

  const [ channels, setChannels ] = useState([]);

  useEffect( ()=>{
    getQuery('/getAllChannels').then( (data)=>{setChannels(data)})
  },[])

  const ChannelElement = (el)=>{
    let posArray=[];

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
        <StListItem button={true} onClick={()=>{cb(el.id)}} key={el.id}>
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

export default ChannelsList
import React,{useLayoutEffect,useState,useEffect} from 'react';
import styled from 'styled-components'
import Header from './header'

import { getQuery } from '../services/query-service'

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import Typography from '@material-ui/core/Typography';



const ChatContent = ({id}) => {

  const [ messages , setMessages] = useState([])
  
  useEffect(()=>{
    setMessages([]);
    getQuery('/getMessages/',{channel_id : id}).then( (data)=>{setMessages(data)})
  },[id])

  const GetListItem = (el)=>{
    return( 
      <ListItem  key={el.id}>
        <ListItemText>
          {el._text}
        </ListItemText>
      </ListItem>
    )
  }

  return (
    <div>
      <Header/>
      <List>
        {messages.map( (el)=>GetListItem(el))}
      </List>
    </div>
  )
}

export default ChatContent
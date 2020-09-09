import React,{useLayoutEffect,useState,useEffect} from 'react';
import styled from 'styled-components'
import Header from './header'

import { getQuery } from '../services/query-service'
import { postQuery } from '../services/query-service'

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const Root = styled.div`
  background-color : white;
  height : calc(100% - 50px);
  align-items: left;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ListContainer = styled.div`
  background-color : white;
  align-items: left;
  display: flex;
  flex-direction: column;
  overflow-y : auto;
  padding : 0% 2% 0% 2%;
`;

const InputContainer = styled.div`
  background-color : white;
  padding : 0;
  margin : 0;
`;

const StTextareaAutosize = styled(TextareaAutosize)`
  font-size : 16px;
  padding : 10px 2% 10px 2%;
  vertical-align: bottom;
  width : 100%;
  align-item : center;
`;

const HeaderContainer = styled.div`

`;

const Block = styled.div`
  height : 100%;
`;


const ChatContent = ({id}) => {

  const [ messages , setMessages] = useState([])
  const [ text , setText] = useState('')
  const [ timer , setTimer] = useState(null)
  
  useEffect(()=>{
    setMessages([]);
    clearTimeout(timer);
    getQuery('/getMessages/',{channel_id : id}).then( (data)=>{setMessages(data)})
    setTimer(setInterval(()=>{getMessage(id)}, 10000))
  },[id])

  const getMessage = (id)=>{
    setMessages([]);
    console.log('Timeout:::',id)
    getQuery('/getMessages/',{channel_id : id}).then( (data)=>{setMessages(data)})
  }

  const GetListItem = (el)=>{
    return( 
      <ListItem  key={el.id}>
        <ListItemText>
          {el._text}
        </ListItemText>
      </ListItem>
    )
  }

  const Send = () =>{
    postQuery('/postMessage',{ 
      channel_id : id,
      user_id : 3, ///TODO: заменить на ...
      _text : text
     }).then( (data)=>{setText('')})
  }

  return (
    <Block>
      <HeaderContainer>
          <Header/>
      </HeaderContainer>
      <Root>
        <ListContainer>
          <List>
            {messages.map( (el)=>GetListItem(el))}
          </List>
        </ListContainer>
        <InputContainer>
          <StTextareaAutosize 
            value={text} 
            rowsMax={10} 
            rowsMin={3}
            onKeyDown={(e)=>{
              if(e.key === 'Enter'){
                Send()}
            }}
            onChange={(e)=>{
              setText(e.target.value)
            }}
            />
        </InputContainer>
      </Root>
    </Block>
  )
}

export default ChatContent
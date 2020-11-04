import React, { useLayoutEffect, useState, useEffect } from 'react';
import styled from 'styled-components'
import Header from './header'
import { getQuery, postQuery } from '../services/query-service'
import { encryptMsg, decryptMsg, generateChannelKey } from '../services/encryption/highLevelEncryption';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const Root = styled.div`
  background-color : white;
  height : calc(100% - 60px);
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
  width : 95%;
  align-items : center;
`;

const HeaderContainer = styled.div`

`;

const Block = styled.div`
  height : 100%;
`;

const ChatContent = ({ channel,setTimer,timer}) => {

  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  

  useEffect(() => {
    clearInterval(timer);
    if ( channel.id != 0){
      getMessage(channel)
      setTimer(setInterval(() => { getMessage(channel) }, 3000))
    }
    return(()=>{clearInterval(timer)})
  }, [channel])

  const getMessage = (channel) => {
    setMessages([]);
    getQuery('/getMessages/', { channel_id : channel.id })
      .then((msgArr) => msgArr.map((msg) => decryptMsg(msg, channel.key )))
      .then(setMessages)
      .catch(console.log);
  }

  const GetListItem = (el) => {
    return (
      <ListItem key={'Unique_key' + el.id}>
        <ListItemText>
          {el.text}
        </ListItemText>
      </ListItem>
    )
  }

  const Send = (channel) => {
    let msg = {
      channel_id: channel.id,
      user_id: 3, ///TODO: заменить на ...
      text
    };
    setText('');
    msg = encryptMsg(msg, channel.key);
    console.log('MSG:::', msg)
    postQuery('/postMessage', msg).then((data) => {})
  }

  return (
    <Block>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <Root>
        <ListContainer>
          <List>
            {messages.map((el) => GetListItem(el))}
          </List>
        </ListContainer>
        <InputContainer>
          <StTextareaAutosize
            value={text}
            rowsMax={10}
            rowsMin={3}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                Send(channel)
              }
            }}
            onChange={(e) => {
              setText(e.target.value)
            }}
          />
        </InputContainer>
      </Root>
    </Block>
  )
}

export default ChatContent

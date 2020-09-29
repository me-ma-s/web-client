import React, { useState } from 'react';
import styled from 'styled-components'
import Hidden from '@material-ui/core/Hidden';

import LeftContent from '../LeftContent'
import ChatContent from '../ChatContent'


const Left = styled.div`
  display : flex;
  height : 99%;
  width : 29%;
  min-width : 350px;
  margin : 0% 0.5%;
  background-color : white;
  overflow-y : auto;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 3px -1px, rgba(0, 0, 0, 0.2) 0px 2px 2px 0px, rgba(0, 0, 0, 0.2) 0px 1px 3px 0px;
`;

const Right = styled.div`
  display : flex;
  height : 99%;
  width : 69%;
  margin : 0% 0.5%;
  background-color : white;
  overflow-y : auto;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 3px -1px, rgba(0, 0, 0, 0.2) 0px 2px 2px 0px, rgba(0, 0, 0, 0.2) 0px 1px 3px 0px;
`;

const RightWithoutLeft = styled.div`
  display : flex;
  height : 99%;
  width : 99%;
  margin : 0% 0.5%;
  background-color : white;
  overflow-y : auto;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 3px -1px, rgba(0, 0, 0, 0.2) 0px 2px 2px 0px, rgba(0, 0, 0, 0.2) 0px 1px 3px 0px;
`;

const Root = styled.div`
  display : flex;
  height : 100vh;
  width : 100vw;
  background-color : white;
  align-items : center;
  background-color : rgba(200,200,200,0.2);
`;

const Chat = () => {
  const [ currentId , setCurrentId  ] = useState(null)
  return ( 
    <Root>
      <Hidden only={['xs','sm']}>
        <Left>
          <LeftContent changeChannels={setCurrentId}/>
        </Left>
        <Right>
          <ChatContent id={currentId}/>
        </Right>
      </Hidden>
      <Hidden only={['lg','xl','md']}>
        <RightWithoutLeft>
          <ChatContent id={currentId}/>
        </RightWithoutLeft>
      </Hidden>
    </Root>
  )
}

export default Chat
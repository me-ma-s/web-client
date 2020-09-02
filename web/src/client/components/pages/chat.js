import React from 'react';
import styled from 'styled-components'

import Header from '../header'
import LeftPart from './leftPart'

const Left = styled.div`
  display : flex;
  height : 98%;
  width : 29%;
  margin : 0.5% 0.5%;
  background-color : white;
  overflow-y : auto;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 3px -1px, rgba(0, 0, 0, 0.2) 0px 2px 2px 0px, rgba(0, 0, 0, 0.2) 0px 1px 3px 0px;
`;

const Right = styled.div`
  display : flex;
  height : 98%;
  width : 69%;
  margin : 0.5% 0.5%;
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
`;

const Chat = () => {
  return ( 
    <Root>
      <Left>
        ALter
      </Left>
      <Right>
        BElter
      </Right>
    </Root>
  )
}

export default Chat
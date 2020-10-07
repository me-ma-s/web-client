import React, { useState } from 'react';
import styled from 'styled-components'

import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FilledInput } from '@material-ui/core';

const Screen = styled.div`
  width : 100vw;
  height : 100vh;
  background-color : white;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Root = styled.div`
  align-items: center;
  text-align: center;
  justify-content: center;
  display: block;
  flex-direction: column;
  width : 20%;
  height : 20vh;
`;

const Auto = () => {
  return(
    <Screen>
      <Root>
        <FormControl>
          <InputLabel>Login</InputLabel>
          <FilledInput></FilledInput>
        </FormControl>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <FilledInput></FilledInput>
        </FormControl>
      </Root>
    </Screen>
  )
}

export default Auto
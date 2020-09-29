import React from 'react';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';


const StIcBut = styled(IconButton)`
  height : 35px;
  width : 35px;
  padding : 22px;
  & > span{
    & > div{
      height : 35px;
      width : 35px;
      font-size : 17px;
      color : white;
      background-color : orange;
    }
  }

`;

const StIcButMenu = styled(IconButton)`
  height : 40px;
  width : 40px;
  padding : 20px;
  & > span{
    & > svg{
      height : 30px;
      width : 30px;
      color : white;
    }
  }

`;

const Root = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding : 0% 2% 0% 2%;
  width: 100%;
  background-color : #1976d2;
  border : solid 1px #1976d2;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px -1px, rgba(0, 0, 0, 0.1) 0px 1px 1px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  color: #fff;
  position: relative;
`;

const BeautySearch = styled(TextField)`
  width : 70%;
  height : 40px;
  & > div{
    height : 40px;
    background-color : white !important;
    border-radius: 0px;
    & .MuiInput-underline:before {
      border-bottom: 2px solid green;
    }
      & > input{
        padding : 0px 5%;
        font-size : 18px;
        outline : none !important;
      }
      &:after {
        border-bottom: none;
      }
  }
`;

const Header = ( { page, cb} ) => {
  return ( 
    <Root>
      { page === 'Left'
        ?
        [ 
          <StIcButMenu key={0}> <MenuIcon/> </StIcButMenu>,
          <StIcBut key={1}> <Avatar variant={'rounded'} >MF</Avatar></StIcBut>,
          <BeautySearch onChange={(e)=>{cb(e.target.value)}} placeholder={'Поиск...'} key={2} variant="filled" />
        ]  
        :
        <p>Text</p>
      }
    </Root>
  )
}

export default Header
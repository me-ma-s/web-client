import React from 'react';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


const StIcBut = styled(IconButton)`
  height : 35px;
  width : 35px;
  padding : 22px;
  & > span{
    & > div{
      height : 35px;
      width : 35px;
      font-size : 17px;
      color : grey;
      background-color : white;
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
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  padding : 0% 0% 0% 1%;
  background-color : #263238;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px -1px, rgba(0, 0, 0, 0.1) 0px 1px 1px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  color: #fff;
  position: relative;
`;

const BeautySearch = styled(TextField)`
  width : 60%;
  height : 36px;
  direction: rtl;
  & .MuiFilledInput-root.Mui-focused {
    transition-property: width;
    transition-timing-function: cubic-bezier(.25,1.33,.81,-0.39);
    transition-duration: 2020ms;
    transition-delay: 0ms;
    width : 150%;
    padding-right : 100px;
  }
  & > div{
    height : 60px;
    background-color : white !important;
    border-radius: 10px;
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

const SmallBox = styled.div`
  width : 40px;
  text-align : center;
`;


const LastBox = styled.div`
  width : calc(100% - 100px);
  margin : 0px 0px 0px 10px;
  text-align : right;
`;


const Header = ( { page, cb, person} ) => {
  return ( 
    <Root>
      { page === 'Left'
        ?
        [ 
          <SmallBox key={0}>
            <StIcButMenu > <MenuIcon/> </StIcButMenu>
          </SmallBox>,
          <SmallBox key={1} >
          <StIcButMenu onClick={person} > <PersonAddIcon/> </StIcButMenu>
          </SmallBox>,
          <LastBox key={2}>
            <BeautySearch onChange={(e)=>{cb(e.target.value)}} placeholder={'Поиск...'} key={2} variant="filled" />
          </LastBox>,
          
        ]  
        :
        <p>Text</p>
      }
    </Root>
  )
}

export default Header
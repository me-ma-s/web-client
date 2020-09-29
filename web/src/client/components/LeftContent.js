import React, {useState,useEffect} from 'react';
import styled from 'styled-components'
import Header from './header'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import ChannelsList from './ChannelsList'


const TabsPlace = styled.div`
  flex-direction: row;
  margin : 0;
  padding : 0;
  display : flex;
  color: #607d8b;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px -1px, rgba(0, 0, 0, 0.1) 0px 1px 1px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  background-color : #f5f5f5;
`;

const StAddIcon = styled(AddIcon)`
  height : 35px;
  width : 35px;
  align-self : center;
  margin : 0px 5px;
  :hover{
    height : 43px;
    width : 43px;
    color : #546e7a;
    margin: 0px 1px;
    transition-property: height color, width;
    transition-timing-function: cubic-bezier(0.1, 0.9, 0.1, 1);
    transition-duration: 100ms;
    transition-delay: 0ms;
  }
`;


const StIcBt = styled(IconButton)`
  display : flex;
  margin : 0;
  padding : 0;
  align-item : center;
  max-width : 45px;
  :hover{
    background-color: rgba(0, 0, 0, 0.00);
  }
`;

const AddIconArea = styled.div`
  border : solid 1px lightgrey;
  margin : 0;
  padding : 0;
  display : flex;
  align-item : center;
`;


const StTabs = styled(Tabs)`
  width : calc( 100% - 45px);
  background-color : #f5f5f5;
  & > div{
    & > div{
      & > button{
        min-width : 50% !important;
        color : #9e9e9e;
        font-size : 16px;
        opacity : 1 !important;
        border : solid 1px rgba(0,0,0,0.1);
      }
      & .Mui-selected{
        color :  #1976d2;
      }
    }
    & > span{
      width : 50%  !important;
      background-color :  #1976d2;
      height : 3px;
    };
  }
`;


const LeftContent = ({changeChannels}) => {

  const [ tabsState , updateTabsState ] = useState(false)
  const [ searchState , updateSearchState] = useState('')
  const [ currentId , setCurrentId ] = useState(null)
  const [ addListElement , setAddListElement ] = useState(false);

  const setSearchState = ( text ) => {
    updateSearchState(text)
  }
  useEffect(()=>{
    changeChannels(currentId)
  },[currentId])

  return ( 
    <div>
      <Header page='Left' cb={setSearchState}/>
      <TabsPlace>
        <AddIconArea>
          <StIcBt onClick={()=>setAddListElement(!addListElement)}>
            <StAddIcon />
          </StIcBt>
        </AddIconArea>
        <StTabs
          value={tabsState}
          onChange={(e,val)=>{updateTabsState(val)}}
        >
          <Tab label="Каналы" value={false} />
          <Tab label="Папки"  value={true} />
        </StTabs>
      </TabsPlace>
      <Divider/>
      { tabsState 
        ?
        null
        :
        <ChannelsList searchWord={searchState} ch={addListElement} cb={setCurrentId} addCh={setAddListElement}/>
      }
    </div>
  )
}

export default LeftContent
import React, {useState,useEffect} from 'react';
import styled from 'styled-components'
import Header from './header'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';

import ChannelsList from './ChannelsList'


const TabsPlace = styled.div`
  overflow-y : auto;
  flex-direction: column;
`;

const StTabs = styled(Tabs)`
  width : 100%;
  background-color : #f5f5f5;
  & > div{
    & > div{
      & > button{
        width : 50% !important;
        color : #9e9e9e;
        font-size : 18px;
        opacity : 1 !important;
      }
      & .Mui-selected{
        color :  #1976d2;
      }
    }
    & > span{
      width : 50% !important;
      background-color :  #1976d2;
      height : 3px;
    };
  }
`;


const LeftContent = () => {

  const [ tabsState , updateTabsState ] = useState(false)
  const [ searchState , updateSearchState] = useState('')
  const setSearchState = ( text ) => {
    updateSearchState(text)
  }

  return ( 
    <div>
      <Header page='Left' cb={setSearchState}/>
      <TabsPlace>
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
        <ChannelsList searchWord={searchState} />
      }
    </div>
  )
}

export default LeftContent
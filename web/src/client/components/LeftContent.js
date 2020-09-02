import React, {useState,useEffect} from 'react';
import styled from 'styled-components'
import Header from './header'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const TabsPlace = styled.div`
  overflow-y : auto;
  flex-direction: column;
`;

const StTabs = styled(Tabs)`
  width : 100%;
  background-color : #f5f5f5;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 3px -1px, rgba(0, 0, 0, 0.2) 0px 2px 2px 0px, rgba(0, 0, 0, 0.2) 0px 1px 3px 0px;
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
      
    </div>
  )
}

export default LeftContent
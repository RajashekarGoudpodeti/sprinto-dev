import React from 'react';
import { Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


function AntdTable(props) {

   const[searchInput, setSearchInput] = React.useState('');
   const[data, setData] = React.useState([]);

   React.useEffect(() => {
    setData(props.data);
   },[props.data])

    const CustomSearch = () => {
      return (
        <div>
         <Input
           prefix={<SearchOutlined  style={{ color: "#8e8e8e", fontSize: "16px"}}/>}
           className= "spto--datatable-search"
           onChange={handleChange}
           value= {searchInput}
           placeholder="Search in list..."
           style={{width: '200px', marginBottom: 15, border: 'none', backgroundColor: '#f3f1f1'}}
          />
        </div>
      );
    };

     
  const handleChange = (e) => {
    const currValue = e.target.value;
    setSearchInput(currValue);
    const filteredData = props.data.filter(entry => {
       const name = entry.name && entry.name.toLowerCase();
       const source = entry.source && entry.source.toLowerCase();
       const type = entry.type && entry.type.toLowerCase();

       const searchvalue = currValue && currValue.toLowerCase();
       if((name && name.includes(searchvalue)) || (source && source.includes(searchvalue)) 
          || (type && type.includes(searchvalue)) ) return true;
    });
    setData(filteredData);
  };

    return (
      <>
      {CustomSearch()}
         <Table
           columns={props.columns}
            dataSource={data}
            showHeader = {true}
         />
      </>
    )
}

export default AntdTable;
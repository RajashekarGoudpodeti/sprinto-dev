import React, { useEffect, useState } from 'react';
import AntdTable from '../tables/AntdTable';
import { Tag, Button, message } from 'antd';


export default function Users(props) {
  const[nameFilters, setNamesFilters] = useState([]);
  const[typeFilters, setTypeFilters] = useState([]);
  const[sourceFilters, setSourceFilters] = useState([]);
  const[users, setUsers] = useState();

  useEffect(() => {
    if (props.users) {
      setUsers(props.users);
    }
  }, [props.users])

  useEffect(()=> {
    const names = [];
    const sources = [];
    const types = [];
    props.users.forEach(user => {
        names.push({
          text : user.name,
          value : user.name
        })

        sources.push({
          text : user.source,
          value : user.source
        })

        types.push({
          text : user.type,
          value : user.type
        })
    });

    setNamesFilters(Array.from(new Set(names.map(JSON.stringify))).map(JSON.parse));
    setTypeFilters(Array.from(new Set(types.map(JSON.stringify))).map(JSON.parse));
    setSourceFilters(Array.from(new Set(sources.map(JSON.stringify))).map(JSON.parse)); 
  },[props.users]);

  const updateUser = (record) => {
    console.log('record is',record)
    const type = record.type === 'human' ? 'bot' : 'human';
    const payload = {
      type : type,
    }
    let updated_users = users.map(item => {
      if(item._id === record._id) {
          item.type = type
      }
      return item;
    });
    setUsers(updated_users);
    userAction(record, payload);
  }

  const userAction = async (record, payload) => {
    const response = await fetch('/update_user/'+record._id, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response.json().then(data => {
      console.log(data);
      if( data.status === 'OK') {
        message.success(`${record.name.toUpperCase()} successfully marked as ${payload.type.toUpperCase()}`);
      } else {
        message.error(`Error in marking ${record.name.toUpperCase()} as ${payload.type.toUpperCase()}`);
      }
    });
  
  }

   const renderType = (row, record) => {
     return (
       <>
        {row.toLowerCase() === 'human' && <Tag color="green">HUMAN</Tag>}
        {row.toLowerCase() === 'bot' && <Tag color="red">BOT</Tag> }
     </>
     )
   }

   const renderActions = ( row, record) => {
     if(record.type.toLowerCase() === 'bot') {
       return(
         <>
             <Button type="link" onClick={()=>updateUser(record)}>Mark as Human</Button>
         </>
       )
     } else {
      return(
        <>
          <Button type="link" onClick={()=>updateUser(record)}>Mark as Bot</Button>
        </>
      )
     }
   }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: nameFilters,
            onFilter: (value, record) => record.name.indexOf(value) === 0,
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            filters: typeFilters,
            render : (row,record) => renderType(row,record),
            onFilter: (value, record) => record.type.indexOf(value) === 0,
            sorter: (a, b) => a.type.localeCompare(b.type),
          },
    
          {
            title: 'Source',
            dataIndex: 'source',
            key: 'source',
            filters: sourceFilters,
            onFilter: (value, record) => record.source.indexOf(value) === 0,
            sorter: (a, b) => a.source.localeCompare(b.source),
          },
          
          {
            title: 'Actions',
            key: 'actions',
            render : (row,record) => renderActions(row,record)
          }
    ]


  return(
    <AntdTable columns={columns} data={users}/>
  )
}
import React from 'react';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';


function Header() {

  return(
   <>
    <div className="spto-header" style={{width: '100%'}}>
        <span className="logo">
            <Image src ="https://sprinto.com/wp-content/uploads/2021/10/logo-sprinto.svg" alt="logo"></Image>
        </span>
        <span className="avatar">
           <span style={{color: '#fff', marginRight: 10}}> Hi, Guest </span> <Avatar style={{ backgroundColor: '#87d068'}} icon={<UserOutlined />}/>
        </span>
    </div>
   </>

  )

}

export default Header;
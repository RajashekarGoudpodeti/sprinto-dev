import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import User from './User';


function Layout(props) {
    const[key, setKey] = React.useState('users');
    const[users, setUsers] = React.useState([]);

    React.useEffect(() => {
      const fetchData =  async() => {
        const users =  await getUsers();
        console.log(users);
        let usersdata = [];
 
        users && users.forEach((item, index) => {
          item.key = index;
          usersdata.push(item);
        })
  
        console.log('usersdata is ',usersdata);
        setUsers(usersdata);
      }
      fetchData();
    },[]);

    const getUsers = async () => {
      return await  fetch('/users').then(res => res.json()).then(data => data);
    }

    const selectItem = (e) => {
      console.log(e);
      setKey(e.currentTarget.dataset.key);
      document.querySelector('.active').classList.remove('active');
      e.currentTarget.classList.add('active');
    }

    return(
        <div className="spto-content-container">
              <div className="spto-palette">
              <div className="item active" onClick={selectItem} data-key="users">
                    <p>
                      <UserOutlined style={{marginRight: 10}}/>
                       Users
                    </p>
                </div>
              </div>
                
              <div className="spto-content">
                {key === 'users' && 
                  <>
                    <User users={users} {...props}/>
                  </>
                }
              </div>
         </div>
    )
}

export default Layout;
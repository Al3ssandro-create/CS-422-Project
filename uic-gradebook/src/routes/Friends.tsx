import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import {  users } from "../components/Friends/constants";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import PersonIcon from "@mui/icons-material/Person";
import Box from "../components/Box";
import {Button} from "@nextui-org/react";

function Friends() {
  const [searchString, setSearchString] = useState('');
  const [usersToShow, setUsersToShow] = useState(users);
  const [isReqFilter, setIsReqFilter] = useState(false);
  const [allUsers, setAllUsers] = useState(users);

  const getCurrentUsers = () => {
    if (isReqFilter) {
      return allUsers.filter(
        (user) => user.status === 'pending' || user.status === 'send',
      );
    } else {
      if(searchString){
        return allUsers.filter(
          (user) => !user?.status,
        );
      }
      return allUsers.filter(
        (user) => user.status==='accepted',
      );
    }
  };

  useEffect(() => {
    setSearchString('');
    setUsersToShow(getCurrentUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReqFilter, allUsers]);

  const onLinkReqClick = (i: number, isAccept: boolean) => {
    const user = usersToShow[i];
    if (isAccept) user.status = 'accepted';
    else delete user.status;
    const usrs = allUsers.map((tempUser) =>
      tempUser.id === user.id ? user : tempUser,
    );
    setAllUsers(usrs);
  };
  const onClick = (i: number) => {
    const user = usersToShow[i];
    user.status = 'send';
    const usrs = allUsers.map((tempUser) =>
      tempUser.id === user.id ? user : tempUser,
    );
    setAllUsers(usrs);
  };

  useEffect(() => {
    const filteredUsers = getCurrentUsers();
    const newUsers = filteredUsers.filter((user) =>
      (user.name + user.surname)
        .toLowerCase()
        .includes(searchString.toLowerCase()),
    );
    setUsersToShow(newUsers);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  return (
    <Box>
      <div>
        <SearchBar
          searchString={searchString}
          setSearchString={setSearchString}
        />
      </div>
      {!isReqFilter&&<Button style={{margin:'1rem'}} onClick={()=>{
   
          setIsReqFilter(true);

      }}>Requests</Button>}
      <div style={{ overflow: 'auto', height: '430px' }}>
        {usersToShow.map((user, i) => {
          return (
            <div
              style={{
                'border-radius': '20px',
                marginTop: '1rem',
                padding: '1rem',
                background: '#f3f3f3',
                display: 'flex',
                justifyContent: 'space-between',
                placeItems: 'center',
                'box-shadow': '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon />
                <span style={{ marginLeft: '1rem' }}>
                  {user.name + ' ' + user.surname}
                </span>
              </span>
              {!isReqFilter ? (
                !user?.status ? (
                  <Button
                    onClick={() => onClick(i)}
                    style={{
                      backgroundColor: '#2c2c44',
                      textTransform: 'none',
                      color:"white"
                    }}
                    disableRipple
                  >
                    Follow
                  </Button>
                ) : (
                  <></>
                )
              ) : user?.status === 'pending' ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    onClick={() => onLinkReqClick(i, false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '20px',
                    }}
                  >
                    <CancelOutlinedIcon />
                  </span>
                  <span
                    onClick={() => onLinkReqClick(i, true)}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <CheckCircleOutlinedIcon />
                  </span>
                </div>
              ) : (
                <div>Pending</div>
              )}
            </div>
          );
        })}
      </div>
    </Box>
    // </div>
  );
}

export default Friends;
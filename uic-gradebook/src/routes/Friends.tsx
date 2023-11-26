import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import {
  XCircleIcon,
  PersonIcon,
  CheckCircleIcon,
} from "@primer/octicons-react";
import Box from "../components/Box";
import { Button, Card, CardBody } from "@nextui-org/react";
import { acceptFriend, addFriend, getFriends, getSearchFriends, removeFriend } from "../api/server";
import { DisplayFriend, User } from "../types/types";
import { Navigate, useNavigate } from "react-router-dom";

// FriendActions component to handle the follow and pending actions
const FriendActions = ({
  friend,
  showFriends,
  onLinkReqClick,
}: {
  friend: DisplayFriend;
  showFriends: boolean;
  onLinkReqClick: (f: DisplayFriend, op: string) => void;
}) => {
  const [displayFriend, setDisplayFriend] = useState<DisplayFriend>(friend);
  const updateDisplayFriend = (action: string) => {
    onLinkReqClick(friend, action)

    if (action === "follow") {
      setDisplayFriend({...displayFriend, status: "pending"})
    } else if (action === "unlink") {
      setDisplayFriend({...displayFriend, status: "none"})
    } else if (action === "accept") {
      setDisplayFriend({...displayFriend, status: "accepted"})
    } else if (action === "refuse") {
      setDisplayFriend({...displayFriend, status: "none"})
    }
  }

  if (displayFriend.status === "none") {
      return (
        <Button
          className="follow-button"
          disableRipple
          onClick={() => updateDisplayFriend("follow")}
        >
          Follow
        </Button>
      );
  } else if (displayFriend.status === "requested") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <div onClick={() => updateDisplayFriend("refuse")}>
          <div style={{color: "red"}}>
          <XCircleIcon size={24}/>
          </div>
        </div>
        <div onClick={() => updateDisplayFriend("accept")}>
          <div style={{color: "green"}}>
          <CheckCircleIcon size={24}/>
          </div>
        </div>
      </div>
    );
  } else if (displayFriend.status === "accepted") {
    return (
      <Button
        className="follow-button"
        disableRipple
        onClick={() => updateDisplayFriend("unlink")}
      >
        Unlink
      </Button>
    );
  }
  return (
    <Button
      className="follow-button"
      disableRipple
      onClick={() => updateDisplayFriend("refuse")}
    >
      Pending
    </Button>
  );
};

// FriendItem component to avoid repeating JSX
const FriendItem = ({
  friend,
  showFriends,
  onLinkReqClick,
}: {
  friend: DisplayFriend;
  showFriends: boolean;
  onLinkReqClick: (f: DisplayFriend, op: string) => void;
}) => {
  const navigate = useNavigate();
  return (
    <div key={friend.id} onClick={() => navigate(`/friends/profile/${friend.name}/${friend.surname}/${friend.id}`)}>
      <Card
        shadow="lg"
        style={{
          marginTop: "2%",
          marginBottom: "2%",
          minHeight: "8vh",
          display: "flex",
          justifyContent: "center",
        }}
        fullWidth
      >
        <CardBody style={{ justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", width: "70%" }}
            >
              <PersonIcon size={24}/>
              <p
                style={{ marginLeft: "2%" }}
              >{`${friend.name} ${friend.surname}`}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "30%",
                justifyContent: "center",
              }}
            >
              <FriendActions
                friend={friend}
                showFriends={showFriends}
                onLinkReqClick={onLinkReqClick}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

function Friends({user}: {user: User}) {
  const [searchString, setSearchString] = useState("");
  const [showFriends, setShow] = useState(true);
  const [searchId, setId] = useState(0);
  const [friends, setFriends] = useState<DisplayFriend[]>([]);
  const [searchRes, setSearchRes] = useState<DisplayFriend[]>([]);

  const fetchFriends = async () => {
    const friendsData = await getFriends(user.id);
  
    setFriends(friendsData);
  };

  useEffect(() => {
    fetchFriends();
  }, [user]);

  useEffect(() => {
    if (friends.length === 0) setShow(false);
    else setShow(true);
  }, [friends]);

  const updateSearch = (value: string) => {
    const id = searchId + 1;

    searchFriends(value, id);

    setId(id);
    setSearchString(value);
  }

  const searchFriends = async (query: string, sid: number) => {
    if (query === "") {
      setShow(true);
    } else {
      setShow(false);

      const { res, id } = await getSearchFriends(user.id, query, sid);
      
      if (id === searchId + 1) {
        setSearchRes(res);
      }
    }
  };

  // follow, accept, refuse, unlink
  const onLinkReqClick = (friend: DisplayFriend, op: string) => {
    
    if (op == "accept") {
      acceptFriend(user.id, friend.id)
    } else if (op == "refuse") {
      removeFriend(user.id, friend.id)
    } else if (op == "follow") {
      addFriend(user.id, friend.id)
    } else if (op == "unlink") {
      removeFriend(user.id, friend.id)
    }

    fetchFriends();
  };

  return (
    <Box>
      <div style={{ marginTop: "4%", width: "100%" }}>
        <SearchBar
          searchString={searchString}
          setSearchString={updateSearch}
        />
      </div>
      <Box>
        <div style={{ width: "100%" }}>
          {showFriends && searchString === "" ? (
            <>
              <div style={{ marginTop: "4%", marginBottom: "4%" }}></div>
              <p style={{ textAlign: "center" }}>Friends and Requests</p>
              <hr />
              {friends?.map((friend) => (
                <FriendItem
                  key={friend.id}
                  friend={friend}
                  showFriends={showFriends}
                  onLinkReqClick={onLinkReqClick}
                />
              ))}
            </>
          ) : (
            <div>
              {searchRes?.map((friend) => (
                <FriendItem
                  key={friend.id}
                  friend={friend}
                  showFriends={showFriends}
                  onLinkReqClick={onLinkReqClick}
                />
              ))}
            </div>
          )}
        </div>
      </Box>
    </Box>
  );
}

export default Friends;

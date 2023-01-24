import React from "react";

import SignUpModal from "./SignUpModal";
import LogInModal from "./LogInModal";
import UserInfoModal from "./UserInfoModal";
import TweetModal from "./TweetModal";
import TweetExtrasModal from "./TweetExtrasModal";
import EditProfileModal from "./EditProfileModal";
import DeleteAccountModal from "./DeleteAccountModal";

export default function Modals(props) {
  return (
    <div>
      <SignUpModal signupFunc={props.functions.createAccount} />
      <LogInModal loginFunc={props.functions.login} />
      <UserInfoModal logoutFunc={props.functions.logout} />
      <TweetModal tweetFunc={props.functions.tweet} />
      <TweetExtrasModal deleteFunc={props.functions.deleteTweet} />
      <EditProfileModal />
      <DeleteAccountModal deleteTweetFunc={props.functions.deleteTweet} />
    </div>
  );
}

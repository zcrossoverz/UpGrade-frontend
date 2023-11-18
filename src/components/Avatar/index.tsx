import React from "react";
import avatarEmpty from "../../assets/avatar.jpg";

function Avatar({ avatar, size }: { avatar?: string; size: number }) {
  return (
    <img
      src={avatar ? avatar : avatarEmpty}
      alt='avatar'
      className={`w-${size} h-${size} rounded-full`}
    />
  );
}

export default Avatar;

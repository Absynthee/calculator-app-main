import React from 'react';

interface UserMessage {
    name: string;
    message: string;
}

const Message: React.FC<UserMessage> = ({name, message}) => {
  return (
<p>{name} says {message}</p>
);
};

export default Message
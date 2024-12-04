import { gql } from '@apollo/client';

export const CHAT_SUBSCRIPTION = gql`
  subscription OnNewChatMessages {
    newChatMessages {
      id
      name
      age
      lastMessage
      imgUrl
      timeSent
      isOnline
      chat {
        id
        messages {
          text
          sender
          timestamp
        }
      }
    }
  }
`;

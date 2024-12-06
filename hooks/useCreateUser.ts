import { gql, useMutation } from '@apollo/client';

const createUserDocument = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      user {
        _id
        email
      }
      token
      refreshToken
    }
  }
`;

const useCreateUser = () => {
  return useMutation(createUserDocument);
};

export { useCreateUser };

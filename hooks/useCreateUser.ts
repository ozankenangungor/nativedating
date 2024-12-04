import { gql, useMutation } from "@apollo/client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      token
    }
  }
`;

interface CreateUserResponse {
  createUser: {
    _id: string;
    email: string;
    token: string;
  };
}

interface CreateUserInput {
  email: string;
}

const useCreateUser = () => {
  const [createUserMutation] = useMutation<CreateUserResponse>(CREATE_USER);
  const router = useRouter();

  const createUser = async (email: string) => {
    try {
      const { data } = await createUserMutation({
        variables: { createUserInput: { email } },
      });
      console.log(data);

      if (data && data.createUser) {
        const { _id, email: userEmail, token } = data.createUser;

        await AsyncStorage.setItem('token', token);
        await router.push('/(modals)/dogrulama');
      } else {
        console.error('User creation failed. No data returned.');
      }
    } catch (error) {
      console.error('Error in creating user:', error);
      throw error; // Hatanın frontendte doğru şekilde gösterilmesi için throw edelim
    }
  };

  return createUser;
};

export { useCreateUser };

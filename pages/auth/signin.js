import {
  Button,
  Center,
  Container,
  HStack,
  Image,
  Input,
  Link,
  Stack,
  Text,
  useRadio,
  VStack,
} from '@chakra-ui/react';
import {
  getServerSession,
  getProviders,
  signIn,
  getCsrfToken,
} from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SignIn({ providers, csrfToken }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    signIn('credentials', {
      ...watch(),
      callbackUrl: '/',
    })
      .then((res) => {
        router.push('/');
      })
      .catch((error) => {
        router.push('/');
        console.log(error);
        // 處理網絡錯誤或其他問題
      });
  };
  return (
    <Container maxW="2xl" pt="10em">
      <Stack flex={1} justifyContent="center" w="100%" spacing={10} px="3em">
        <Text textAlign="center" fontWeight={700} fontSize="30px">
          LogIn
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={5} w="100%">
            <Input
              name="csrfToken"
              type="hidden"
              defaultValue={csrfToken}
            ></Input>

            <Input
              {...register('email', {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
              bg="white"
              placeholder="happy@gmail.com"
            ></Input>
            <Input
              {...register('password', {
                required: true,
                minLength: 6,
                pattern: /^[a-z0-9\.]+$/,
              })}
              bg="white"
              placeholder="Min. 6 characters including numbers and letters"
            ></Input>
            <Button type="submit" w="100%">
              Login
            </Button>
          </VStack>
          {/* <VStack py='2' alignItems='start'>
            {errors.password && (
              <Text fontSize='14px' color='red.600'>
                {passwordMessage[errors.password.type ?? ""]}
              </Text>
            )}
            {errors.email && (
              <Text fontSize='14px' color='red.600'>
                {emailMessage[errors.email.type ?? ""]}
              </Text>
            )}
          </VStack> */}
        </form>
        <Text textAlign="center">Other Log In</Text>
        {Object.values(providers)
          .slice(1, 2)
          .map((provider) => (
            <Button
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              key={provider.name}
            >
              <HStack>
                <Image src="/google.svg" w="2em"></Image>
                <Text>Sign in with {provider.name}</Text>
              </HStack>
            </Button>
          ))}
        <HStack justifyContent="center">
          <Text> {`Don't have an account ?`}</Text>
          <Link href="/register">
            <Text cursor="pointer" textDecoration="underline" color="red.500">
              Go to sign up
            </Text>
          </Link>
        </HStack>
      </Stack>
    </Container>
    // <VStack pt='10em'>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
    //       <label htmlFor='username'>Username</label>
    //       <input
    //         id='username'
    //         name='username'
    //         type='text'
    //         placeholder='Username'
    //         onChange={(e) => setEmail(e.target.value)}
    //         value={email}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor='password'>Password</label>
    //       <input
    //         id='password'
    //         name='password'
    //         type='password'
    //         placeholder='Password'
    //         onChange={(e) => setPassword(e.target.value)}
    //         value={password}
    //       />
    //     </div>
    //     <button type='submit'>Login</button>
    //   </form>

    //   {Object.values(providers)
    //     .slice(1, 2)
    //     .map((provider) => (
    //       <div key={provider.name}>
    //         <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
    //           Sign in with {provider.name}
    //         </button>
    //       </div>
    //     ))}
    // </VStack>
  );
}

export async function getServerSideProps(context) {
  // const session = await getServerSession(context.req, context.res, authOptions);
  // 如果使用者已經登入，重新導向到指定路徑
  // 注意：請確保不要重新導向到相同的頁面，以避免無限迴圈！
  // if (session) {
  //   return { redirect: { destination: "/" } };
  // }
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();

  return {
    props: { providers: providers || [], csrfToken },
  };
}

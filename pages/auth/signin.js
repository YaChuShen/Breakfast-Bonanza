import { Button, Input, useRadio, VStack } from "@chakra-ui/react";
import {
  getServerSession,
  getProviders,
  signIn,
  getCsrfToken,
} from "next-auth/react";
import { useRouter } from "next/router";

export default function SignIn({ providers, csrfToken }) {
  const router = useRouter();
  return (
    <VStack pt="10em">
      <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Username
        <Input name="username" type="text" />
      </label>
      <label>
        Password
        <Input name="password" type="password" />
      </label>
      <Button
        onClick={() => {
          signIn("credentials", {
            email: "xog98982@omeie.com",
            password: "abc123",
            redirect: false,
          });
          router.push("/");
        }}
      >
        Sign in
      </Button>
      {Object.values(providers)
        .slice(1, 2)
        .map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </VStack>
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

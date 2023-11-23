import { Button, Input, useRadio, VStack } from "@chakra-ui/react";
import {
  getServerSession,
  getProviders,
  signIn,
  getCsrfToken,
} from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignIn({ providers, csrfToken }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // "username-login" matches the id for the credential
    signIn("username-login", { username, password });
  };
  return (
    <VStack pt="10em">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit">Login</button>
      </form>

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

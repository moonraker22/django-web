import { useSession, signIn, signOut } from "next-auth/react";

function AuthLinks() {
  const { data: session, status } = useSession();

  const loading = status === "loading";
  console.log(status, session, loading);

  if (loading) return null;

  return (
    <>
      {session ? (
        <p>
          <span>Signed in as {session?.user?.email}</span>
          <button onClick={signOut}>Sign out</button>
        </p>
      ) : (
        <>
          <button onClick={signIn}>Sign in</button>
        </>
      )}
    </>
  );
}

export default function IndexPage() {
  return <AuthLinks />;
}

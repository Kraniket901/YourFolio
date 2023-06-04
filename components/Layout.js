import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="front-outer-border2">
        <div className="front-inner-border">
          <h1>Welcome to YourFolio</h1>
          <p>Create your personal portfolio easily with us</p>
          <button
            className={"bg-white p-2 px-4 rounded-lg"}
            onClick={async () => {
              await signIn('google');
            }}
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="front-outer-border">
      <div className="front-inner-border">
      {children}
      </div>
        
    </div>
  );
}

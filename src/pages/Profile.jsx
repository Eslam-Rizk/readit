import { useUser } from "../contexts/userContext";

export default function Profile() {
    const { user } = useUser();
  
  return (
    <div className="flex flex-col items-center">
      <p className="text-lg">My Profile Settings</p>
      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>email: {user.email}</p>
        </>
      )}
    </div>
  );
}

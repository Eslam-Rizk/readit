import React, { createContext, useState, useContext, useEffect } from "react";
import CheckLoggedInUser from "../utils/LoggedInUser";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // Wait for localStorage

  useEffect(() => {
    const loggedInUser = CheckLoggedInUser();
    if (loggedInUser) setUser(loggedInUser);
        setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div>Loading...</div>; // Prevent premature render

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

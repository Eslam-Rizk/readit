export default function CheckLoggedInUser() {
  const loggedInUser = localStorage.getItem("user");  
  let user;
  if(loggedInUser) user = JSON.parse(loggedInUser);

  if (!user || user === "Undefined") {
    return null;
  }
  return user;
}

export function logout(setUser) {
  setUser(null);
  localStorage.removeItem("user");
}

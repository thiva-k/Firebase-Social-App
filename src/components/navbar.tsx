// Navbar.js
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import '../styles/styles.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="navbar">
      <div className="link">
        <Link className="navbar-link" to="/">Home</Link>
        {!user ?
        (<Link className="navbar-link" to="/login">Login</Link>):
        (<Link className="navbar-link" to="/createpost">Create Post</Link>)}
      </div>

      {user ? (
        <div className="user-display">
          <p>{user.displayName}</p>
          <img src={user.photoURL || ""} width="100" height="100" />
          <button onClick={signUserOut}>Log Out</button>
        </div>
      ) : null}
    </div>
  );
};

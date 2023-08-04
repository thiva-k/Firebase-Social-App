import { auth, provider } from "../config/firebase";
import { signInWithPopup } from 'firebase/auth';

import {useNavigate} from "react-router-dom"

export const Login = () => {

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
            try{
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            navigate('/')
            }catch(err){
                console.log(err)
            }
        
    };

    return (
        <div className="login-container">
            <p className="login-text">Sign in with Google to continue</p>
            <button className="login-button" onClick={signInWithGoogle}>Sign In</button>
        </div>
    );
};

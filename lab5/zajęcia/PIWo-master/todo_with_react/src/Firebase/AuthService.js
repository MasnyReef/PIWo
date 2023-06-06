import { auth } from "./init"
import { useState, useEffect } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    sighOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const logInWithGoogle = async () => {
    try{
        await signInWithPopup(auth, googleProvider);
    }
    catch (err) {
        console.error({err});
        alert(err.message);
    }
};

export const useUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();

    }, []);
    return user;
}
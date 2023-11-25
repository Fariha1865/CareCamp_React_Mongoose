import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../../firebase.config";
import useAxiosSecure from "../hooks/AxiosSecure";


const AuthProvider = ({ children }) => {

  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {

    const unSubscribe = onAuthStateChanged(auth, currentUser => {

      setUser(currentUser);
      setLoading(false);
      console.log(currentUser);

      const userInfo = {email: currentUser?.email};
      if (currentUser) {
        const url = '/jwt';

        axiosSecure.post(url,userInfo)
        .then(res=>{

              localStorage.setItem("access-token",res?.data)
                console.log(res.data)

        })
      }
       else {
        const url = '/logout'
        axiosSecure.post(url, userInfo)
          .then(res => {

            localStorage.removeItem("access-token");
            console.log(res.data)

          }
          )
      }

    })

    return () => {
      return unSubscribe();
    }


  }, [auth,axiosSecure])

  const createUser = (email, password) => {

    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signInUser = (email, password) => {

    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  const updateUserProfile = (name, photo) => {

    console.log(name, photo)
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photo
    });
  }

  const googleLogin = () => {

    return signInWithPopup(auth, googleProvider);
  }



  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    logOut,
    updateUserProfile,
    googleLogin
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
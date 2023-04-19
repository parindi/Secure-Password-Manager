import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";
import Loader from "@/elements/Loader";
import { useEffect, useState } from "react";
import { passwordsCollection } from "@/firebase/firestore/references";
import Card from "@/elements/Card";
import NewPwd from "@/elements/NewPwd";


const dashboard = () => {
  //auth user object
  const AuthUser = useAuthUser();

  //signout user
  const handleLogout = () => AuthUser.signOut();

  const [passwords, setPasswords] = useState([])

  const getData = () => {
    passwordsCollection.where("uid", "==", AuthUser.id).get().then(snapshot => {
      const list = []

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data()
        })
      });

      setPasswords(list)

      console.log(list)
    }, (err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getData()
  }, [])




  return (
    <div className="container mx-auto my-10 p-5">
      <div className="flex items-center w-full justify-between">
        <h1 className="text-6xl font-extrabold">
          Dashboard
        </h1>

        <div className="flex flex-col items-end">
          <span className="text-xl font-bold">
            {AuthUser.displayName ? AuthUser.displayName : "Anonymous"}
          </span>

          <span className="opacity-60">
            {AuthUser.email}
          </span>
        </div>
      </div>

      <hr className="my-10 text-gray" />

      <div className="text-xl">Saved Passwords</div>
      <div className="flex w-full flex-wrap gap-5 mb-14">
        {passwords.length > 0 && passwords.map((pwd) => {
          return <Card key={pwd.id} email={pwd.email} website={pwd.website} password={pwd.password} />
        })}
      </div>

      <NewPwd refresh={getData} />
      <article className="text-left">
        <button
          className="bg-blue rounded shadow-md p-2 text-white text-lg my-10 font-extrabold"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </article>
    </div>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
  authPageURL: "/login",
})(dashboard);

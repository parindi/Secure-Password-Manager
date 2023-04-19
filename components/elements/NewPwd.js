import { passwordsCollection } from "@/firebase/firestore/references";
import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";

const NewPwd = ({ refresh }) => {
  const [website, setWebsite] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const AuthUser = useAuthUser();

  const passwordGen = () => {


    let pass = "";
    for (let l = 0; l < 13; l++) {
      const rand = Math.random() * (126 - 33) + 33;
      pass += String.fromCharCode(~~rand);
    }


    console.log(pass)
    setPassword(pass)
  }

  const save = async () => {


    await passwordsCollection.add({
      website,
      password,
      email,
      uid: AuthUser.id

    })

    setEmail("")
    setPassword("")
    setWebsite("")
    refresh()
  }



  return (
    <div>
      <div className="mb-2 text-lg">New Password</div>

      <div className="border w-96 py-6 px-4 rounded-md bg-gray flex flex-col gap-3">
        <label>
          Website
          <input
            onChange={(e) => setWebsite(e.target.value)}
            value={website}
            className="p-1 w-full rounded-md border-navy outline-solid"
            style={{ outline: "#303030 solid" }} />
        </label>

        <label>
          Email
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-1 w-full rounded-md border-navy outline-solid"
            style={{ outline: "#303030 solid" }} />
        </label>

        <label>
          Password
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="p-1 w-full rounded-md border-navy outline-solid"
            style={{ outline: "#303030 solid" }} />
        </label>

        <div className="mb-4 text-xs text-blue cursor-pointer select-none" onClick={passwordGen}>Generate Password</div>

        <button
          onClick={save}
          className="bg-blue rounded shadow-md p-2 text-white text-lg font-extrabold"

        >
          Save password
        </button>
      </div>
    </div>
  );
};

export default NewPwd;

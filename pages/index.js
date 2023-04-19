import Head from "next/head";
import Link from "next/link";
import enableMessaging from "@/messaging/enableMessaging";
import { useAuthUser } from "next-firebase-auth";

export default function Home({ data }) {
  //{data} is from getStaticProps() exported below.
  return (
    <div>
      <Head>
        <title>Password Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container px-5 mx-auto py-20 flex flex-col items-center justify-center h-screen">
        <h1 className="text-6xl font-extrabold text-center">
          🔐 <br />
          Password <br />Manager


        </h1>


        <div className="w-fullflex items-center justify-center">
          <Link href="/dashboard">
            <div className="w-28 text-center rounded-md p-2 mt-12 text-white" style={{ background: "#000" }}>
              View Vault
            </div>
          </Link>

        </div>



      </main>
    </div>
  );
}

// export async function getStaticProps(context) {
//   //Note: Do not use client functions here!

//   //getDoc function is from Admin SDK.
//   const data = await import("@/FS-admin-functions").then(({ getDoc }) =>
//     getDoc()
//   );

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }

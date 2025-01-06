// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import React from "react";

// export default async function AuthWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { userId } = await auth();

//   // If there is no userId (i.e., the user is not authenticated), redirect to /sign-in
//   if (!userId) {
//     redirect("/sign-in");
//   }

//   // If authenticated, render the children components
//   return <>{children}</>;
// }

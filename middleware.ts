import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard","/admin/dashboard"]);

export default clerkMiddleware(async (auth,req) => {
  // console.log("Middleware running");

  try {
    const { userId } = await auth();
    // console.log("User ID:", userId);

    // Use URL constructor to safely handle the URL and pathname
    const url = new URL(req.url);
    // console.log("Current URL:", url.pathname);

    // If the user is not authenticated and trying to access non-public routes, redirect to sign-in
    // if (!userId && !publicRoutes.includes(url.pathname)) {
    //   console.log("Redirecting unauthenticated user to sign-in");
    //   return NextResponse.redirect(new URL("/sign-in", req.url));
    // }
    if (!userId && isProtectedRoute(req)) {
      console.log("Redirecting unauthenticated user to sign-in");
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // If the user is authenticated, check their role
    if (userId) {
      try {
        // const user =  auth; 
        // console.log(user)// Use await to resolve the user object
        // const {userId} = auth;
        // user_2rABnkgjod3sjkactsLMOz6HrbL
        // console.log(userId)
        console.log(process.env.NEXT_PUBLIC_ADMIN_ID)
        const role =  (await auth()).userId===process.env.NEXT_PUBLIC_ADMIN_ID? "admin" : undefined
        // console.log("User role:", role);

        // If the user is an admin and trying to access /dashboard, redirect to /admin/dashboard
        if (role === "admin" && url.pathname === "/dashboard") {
          // console.log("Redirecting admin to admin dashboard");
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }

        // If the user is not an admin and tries to access any admin routes, redirect them to /dashboard
        if (role !== "admin" && url.pathname.startsWith("/admin")) {
          // console.log("Redirecting non-admin from admin route");
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        // Redirect authenticated users trying to access public routes
        // if (!isProtectedRoute(req)) {
        //   console.log("Redirecting authenticated user from public route");
        //   return NextResponse.redirect(
        //     new URL(role === "admin" ? "/admin/dashboard" : "/dashboard", req.url)
        //   );
        // }

        // If no redirects are needed, continue with the request
        // console.log("Continuing with request");
        return NextResponse.next();
      } catch (error) {
        console.error("Error in fetching user data:", error);
        return NextResponse.redirect(new URL("/errorpage", req.url));
      }
    }

    // If no redirects are needed for unauthenticated users, continue with the request
    // console.log("Continuing with unauthenticated request");
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // return NextResponse.redirect(new URL("/errorpage", req.url));
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

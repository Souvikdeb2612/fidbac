import { NextResponse } from "next/server";
import { auth, BASE_PATH } from "@/auth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default auth((req) => {
  const reqUrl = new URL(req.url);
  
  // Check if the user is not authenticated and is not already on the sign-in page
  if (!req.auth && reqUrl?.pathname !== "/") {
    // Construct the redirect URL to the sign-in page with a callback URL
    const redirectUrl = new URL(
      `${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(reqUrl?.pathname)}`,
      req.url
    );
    
    // Redirect the user to the sign-in page
    return NextResponse.redirect(redirectUrl);
  }
  
  // If the user is authenticated, continue with the request
  return NextResponse.next();
});

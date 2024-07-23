import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { getToken } from 'next-auth/jwt'
import { User } from './models/user.model'
import { ConnectionToDB } from './configs/db_config'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath =
    path === '/login' ||
    path === '/signup'

  // const token = request.cookies.get('token')?.value || '';
  let token = await getToken({ req: request }) || request.cookies.get('token')?.value;

//  if(token) {
  
//     try {
//       await ConnectionToDB();
//       const user = await User.findOne({ email: token.email });

//       if (!user) {
//         return NextResponse.redirect(new URL('/login', request.nextUrl));
//       }

//       request.luser = user;
//       console.log("REQUEST USER IS ---> ", request.luser)
//     } 
//    catch (error) {
    
//   }
//  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
  ]
}
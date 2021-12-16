import { NextResponse } from 'next/server';

export default function middleware(req) {
  const { token } = req.cookies;
  const url = req.url;

  // if (!token && url == "/dashboard") {
  //   return NextResponse.redirect("/login");
  // }
  if (token && (url == '/login' || url == '/register')) {
    return NextResponse.redirect('/');
  }
}

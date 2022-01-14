/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse } from 'next/server';

export const middleware = (req, res) => {
  const { token, role } = req.cookies;
  console.log(role);
  console.log(token);

  if (!token) return NextResponse.redirect('/login');
  if (role === 'User') return NextResponse.redirect('/login');
  return NextResponse.next(req, res);
};

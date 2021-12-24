/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse } from 'next/server';

export const middleware = (req, res) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token) return NextResponse.redirect('/login');
};

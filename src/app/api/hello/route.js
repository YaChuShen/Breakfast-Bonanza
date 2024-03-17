import { NextRequest, NextResponse } from 'next/server';

export async function GET(NextRequest) {
  const greeting = 'Hello World!!';
  const json = {
    greeting,
  };

  return NextResponse.json(json);
}

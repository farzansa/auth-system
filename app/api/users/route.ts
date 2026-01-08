import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { User } from '@/lib/user.types';

const file = path.join(process.cwd(), 'data/users.json');

const read = (): User[] =>
  JSON.parse(fs.readFileSync(file, 'utf-8'));

const write = (data: User[]) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

export async function GET() {
  return NextResponse.json(read());
}

/* =========
  Create User + Send Invitation
========= */
export async function POST(req: Request) {
  const body = await req.json();
  const users = read();

  const user: User = {
    id: Date.now().toString(),
    name: body.name,
    email: body.email,
    role: body.role,
    permissions: body.permissions,
    expiresAt: body.expiresAt,
    status: 'inactive',
    invitedAt: new Date().toISOString(),
    lastLogin: null,
  };

  users.push(user);
  write(users);

  return NextResponse.json(user);
}

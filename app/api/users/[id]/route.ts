import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { User } from '@/lib/user.types';

const file = path.join(process.cwd(), 'data/users.json');

const read = (): User[] =>
  JSON.parse(fs.readFileSync(file, 'utf-8'));

const write = (data: User[]) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

/* =========
  User Editing
========= */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const users = read();

  const index = users.findIndex((u) => u.id === params.id);
  if (index === -1)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });

  users[index] = {
    ...users[index],
    ...body,
  };

  write(users);
  return NextResponse.json(users[index]);
}

/* =========
  Block / Active / Role Change
========= */
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { action, value } = await req.json();
  const users = read();

  const user = users.find((u) => u.id === params.id);
  if (!user)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (action === 'block') user.status = 'blocked';
  if (action === 'toggle')
    user.status = user.status === 'active' ? 'inactive' : 'active';
  if (action === 'role') user.role = value;

  write(users);
  return NextResponse.json(user);
}

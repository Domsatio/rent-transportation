import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from 'next'
import { createUser, updateUser, deleteUser, getOneUser, getAllUsers, existingUser } from '@/controllers/userController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, name } = req.body;    
    const isUserExist = await existingUser(email);
    console.log(email, password, name);
    
    if (isUserExist) {
        return res.status(409).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    const user = await createUser(req.body);
    if (!user) {
        return res.status(500).json({ error: 'Error creating user' });
    }
    res.status(201).json({
        data: user,
        message: 'User created successfully',
    });
  }  else if (req.method === 'PUT') {
    const { id } = req.query;
    const user = await updateUser(Number(id), req.body);
    res.status(200).json(user);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    await deleteUser(Number(id));
    res.status(204).end();
  } else if (req.method === 'GET' && req.query.id) {
    const { id } = req.query;
    const user = await getOneUser(Number(id));
    res.status(200).json(user);
  } else if (req.method === 'GET') {
    const users = await getAllUsers();
    res.status(200).json(users);
  } else {
    res.status(405).end();
  }
}




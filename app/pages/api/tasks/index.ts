import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../db/database';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Retorna todas as tarefas
    const tasks = db.prepare('SELECT * FROM tasks').all();
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    // Cria uma nova tarefa
    const { title } = req.body;
    const stmt = db.prepare('INSERT INTO tasks (title, completed) VALUES (?, ?)');
    const result = stmt.run(title, false);
    res.status(201).json({ id: result.lastInsertRowid, title, completed: false });
  } else {
    res.status(405).end(); // Método não permitido
  }
}

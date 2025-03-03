import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/app/db/database';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    // Atualiza o status da tarefa
    const stmt = db.prepare('UPDATE tasks SET completed = NOT completed WHERE id = ?');
    stmt.run(id);
    res.status(200).json({ id, message: 'Tarefa atualizada' });
  } else if (req.method === 'DELETE') {
    // Exclui a tarefa
    const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
    stmt.run(id);
    res.status(200).json({ message: 'Tarefa excluída' });
  } else {
    res.status(405).end(); // Método não permitido
  }
}

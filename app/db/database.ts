import betterSqlite3 from 'better-sqlite3';

// Conectando ao banco de dados SQLite (será criado se não existir)
const db = betterSqlite3('tasks.db');

// Criando a tabela tasks se não existir
db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0
  )
`).run();

// Popular com algumas tarefas iniciais
db.prepare('INSERT INTO tasks (title, completed) VALUES (?, ?)').run('Tarefa 1', false);
db.prepare('INSERT INTO tasks (title, completed) VALUES (?, ?)').run('Tarefa 2', true);

export default db;

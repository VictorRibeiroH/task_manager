import { Task } from '../types/task';

let mockTasks: Task[] = [
  {
    id: 1,
    title: 'Completar documentação',
    description: 'Escrever a documentação do projeto',
    status: 'pendente',
    created_at: '2024-03-14T10:00:00.000Z',
    updated_at: '2024-03-14T10:00:00.000Z'
  },
  {
    id: 2,
    title: 'Implementar autenticação',
    description: 'Adicionar sistema de login e registro',
    status: 'em_progresso',
    created_at: '2024-03-14T11:00:00.000Z',
    updated_at: '2024-03-14T11:00:00.000Z'
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  login: async (email: string, password: string) => {
    await delay(500);
    if (email === 'test@example.com' && password === 'password') {
      return {
        user: { id: 1, name: 'Test User', email },
        token: 'mock-token'
      };
    }
    throw new Error('Invalid credentials');
  },

  register: async (name: string, email: string, password: string) => {
    await delay(500);
    return {
      user: { id: 1, name, email },
      token: 'mock-token'
    };
  },

  getTasks: async () => {
    await delay(300);
    return mockTasks;
  },

  createTask: async (task: Partial<Task>) => {
    await delay(300);
    const newTask = {
      id: mockTasks.length + 1,
      title: task.title!,
      description: task.description!,
      status: task.status!,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockTasks = [newTask, ...mockTasks];
    return newTask;
  },

  updateTask: async (id: number, task: Partial<Task>) => {
    await delay(300);
    mockTasks = mockTasks.map(t => 
      t.id === id ? { ...t, ...task, updated_at: new Date().toISOString() } : t
    );
    return mockTasks.find(t => t.id === id)!;
  },

  deleteTask: async (id: number) => {
    await delay(300);
    mockTasks = mockTasks.filter(t => t.id !== id);
  }
};
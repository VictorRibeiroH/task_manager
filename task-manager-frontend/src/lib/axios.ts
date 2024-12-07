import { mockApi } from './mockApi';

// Usando o mock API em vez do axios para desenvolvimento
export default {
  get: async (url: string) => {
    if (url === '/tasks') {
      const data = await mockApi.getTasks();
      return { data };
    }
    throw new Error(`Unhandled GET request to ${url}`);
  },

  post: async (url: string, body: any) => {
    if (url === '/login') {
      const data = await mockApi.login(body.email, body.password);
      return { data };
    }
    if (url === '/register') {
      const data = await mockApi.register(body.name, body.email, body.password);
      return { data };
    }
    if (url === '/tasks') {
      const data = await mockApi.createTask(body);
      return { data };
    }
    throw new Error(`Unhandled POST request to ${url}`);
  },

  put: async (url: string, body: any) => {
    const match = url.match(/\/tasks\/(\d+)/);
    if (match) {
      const id = parseInt(match[1], 10);
      const data = await mockApi.updateTask(id, body);
      return { data };
    }
    throw new Error(`Unhandled PUT request to ${url}`);
  },

  delete: async (url: string) => {
    const match = url.match(/\/tasks\/(\d+)/);
    if (match) {
      const id = parseInt(match[1], 10);
      await mockApi.deleteTask(id);
      return { data: null };
    }
    throw new Error(`Unhandled DELETE request to ${url}`);
  }
};
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../lib/axios';
import { Task } from '../types/task';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { useAuthStore } from '../store/auth';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const logout = useAuthStore((state) => state.logout);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get<Task[]>('/tasks');
      setTasks(data);
    } catch (error) {
      toast.error('Erro ao carregar tarefas');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData: Partial<Task>) => {
    try {
      await api.post('/tasks', taskData);
      fetchTasks();
      setIsFormOpen(false);
      toast.success('Task criada com sucesso');
    } catch (error) {
      toast.error('Erro ao criar Task');
    }
  };

  const handleUpdateTask = async (taskData: Partial<Task>) => {
    if (!editingTask) return;
    try {
      await api.put(`/tasks/${editingTask.id}`, taskData);
      fetchTasks();
      setEditingTask(null);
      toast.success('Task atualizada com sucesso');
    } catch (error) {
      toast.error('Erro ao atualizar Task');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
      toast.success('Task excluída com sucesso');
    } catch (error) {
      toast.error('Erro ao excluir Task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">Gerenciador de Tarefas</h1>
            <button
              onClick={logout}
              className="text-gray-500 hover:text-gray-700"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nova Task
            </button>
          </div>

          {(isFormOpen || editingTask) && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">
                  {editingTask ? 'Editar Task' : 'Criar Task'}
                </h2>
                <TaskForm
                  task={editingTask || undefined}
                  onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                  onCancel={() => {
                    setIsFormOpen(false);
                    setEditingTask(null);
                  }}
                />
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={setEditingTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tasks;
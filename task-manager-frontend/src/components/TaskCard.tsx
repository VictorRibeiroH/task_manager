import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const statusColors = {
  pendente: 'bg-yellow-100 text-yellow-800',
  em_progresso: 'bg-blue-100 text-blue-800',
  completa: 'bg-green-100 text-green-800',
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{task.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Pencil className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            statusColors[task.status]
          }`}
        >
          {task.status.replace('_', ' ')}
        </span>
        <span className="text-sm text-gray-500">
          {new Date(task.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
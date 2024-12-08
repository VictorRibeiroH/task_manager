<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Recuperar task do usuário autenticado
            $tasks = $request->user()->tasks()->orderBy('created_at', 'desc')->get();
            Log::info('Tasks retrieved successfully', ['user_id' => $request->user()->id]);

            return response()->json($tasks);
        } catch (\Exception $e) {
            Log::error('Error retrieving tasks', ['error' => $e->getMessage(), 'user_id' => $request->user()->id]);

            return response()->json(['message' => 'Error retrieving tasks'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            // Validação dos dados
            $validated = $request->validate([
                'title' => ['required', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'status' => ['required', 'in:pending,in_progress,completed'],
            ]);

            // Criar nova task associada ao usuário autenticado
            $task = $request->user()->tasks()->create($validated);
            Log::info('Task criada com sucesso', ['task_id' => $task->id, 'user_id' => $request->user()->id]);

            return response()->json($task, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('Erro na validdação da Task', ['errors' => $e->errors(), 'user_id' => $request->user()->id]);

            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Erro na criação da Task', ['error' => $e->getMessage(), 'user_id' => $request->user()->id]);

            return response()->json(['message' => 'Erro na criação da Task'], 500);
        }
    }

    public function show(Request $request, $id)
    {
        try {
            // Encontrar a task pelo ID e autorizar
            $task = $request->user()->tasks()->findOrFail($id);
            Log::info('Task check', ['task_id' => $task->id, 'user_id' => $request->user()->id]);

            return response()->json($task);
        } catch (ModelNotFoundException $e) {
            Log::warning('Task não encontrada', ['task_id' => $id, 'user_id' => $request->user()->id]);

            return response()->json(['message' => 'Task not found'], 404);
        } catch (\Exception $e) {
            Log::error('Error task', ['error' => $e->getMessage(), 'task_id' => $id, 'user_id' => $request->user()->id]);

            return response()->json(['message' => 'Error task'], 500);
        }
    }

    public function update(Request $request, $id)
{
    try {
      
        $task = $request->user()->tasks()->findOrFail($id);

        // Validar os dados
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:pending,in_progress,completed'],
        ]);

        // Atualizar a task
        $task->update($validated);
        Log::info('Task atualizada', ['task_id' => $task->id, 'user_id' => $request->user()->id]);

            return response()->json($task);
        } catch (ModelNotFoundException $e) {
            Log::warning('Task não achada para atualizar', ['task_id' => $id, 'user_id' => $request->user()->id]);

            return response()->json(['message' => 'Task not found'], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('Falha na validação', ['errors' => $e->errors(), 'task_id' => $id, 'user_id' => $request->user()->id]);

            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error em atualizar task', ['error' => $e->getMessage(), 'task_id' => $id, 'user_id' => $request->user()->id]);

            return response()->json(['message' => 'Error em atualizar task'], 500);
        }
}


public function destroy(Request $request, $id)
{
    try {
  
        $task = $request->user()->tasks()->find($id);

        // Verificar se a task existe e se pertence ao usuário
        if (!$task) {
            Log::warning('Task não encontrada para excluir', ['task_id' => $id, 'user_id' => $request->user()->id]);
            return response()->json(['message' => 'Task não encontrada ou não autorizada'], 404);
        }

        // Excluir a task
        $task->delete();
        Log::info('Task deletada', ['task_id' => $id, 'user_id' => $request->user()->id]);

        return response()->json(null, 204);
    } catch (\Exception $e) {
        Log::error('Error em excluir task', ['error' => $e->getMessage(), 'task_id' => $id, 'user_id' => $request->user()->id]);

        return response()->json(['message' => 'Error em excluir task'], 500);
    }
}


}
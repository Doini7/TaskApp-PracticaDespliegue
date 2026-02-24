import { describe, it, expect } from 'vitest';
import { createTask, addTask, toggleTask, removeTask, getStats } from './tasks.js';

describe('createTask', () => {
  it('crea una tarea con texto, id y done=false', () => {
    const task = createTask('Estudiar Docker');
    expect(task.text).toBe('Estudiar Docker');
    expect(task.done).toBe(false);
    expect(task.id).toBeTypeOf('number');
  });

  it('elimina espacios en blanco del texto', () => {
    const task = createTask('  Estudiar Vite  ');
    expect(task.text).toBe('Estudiar Vite');
  });

  it('lanza error si el texto está vacío', () => {
    expect(() => createTask('')).toThrow();
    expect(() => createTask('   ')).toThrow();
  });
});

describe('addTask', () => {
  it('añade una tarea a una lista vacía', () => {
    const task = createTask('Nueva tarea');
    const list = addTask([], task);
    expect(list).toHaveLength(1);
    expect(list[0].text).toBe('Nueva tarea');
  });

  it('no muta la lista original', () => {
    const original = [];
    const task = createTask('Tarea');
    addTask(original, task);
    expect(original).toHaveLength(0);
  });
});

describe('toggleTask', () => {
  it('cambia done de false a true', () => {
    const task = createTask('Tarea');
    const list = [task];
    const updated = toggleTask(list, task.id);
    expect(updated[0].done).toBe(true);
  });

  it('cambia done de true a false', () => {
    const task = { ...createTask('Tarea'), done: true };
    const updated = toggleTask([task], task.id);
    expect(updated[0].done).toBe(false);
  });

  it('no afecta a otras tareas', () => {
    const t1 = createTask('Tarea 1');
    const t2 = createTask('Tarea 2');
    const updated = toggleTask([t1, t2], t1.id);
    expect(updated[1].done).toBe(false);
  });
});

describe('removeTask', () => {
  it('elimina la tarea indicada', () => {
    const t1 = createTask('Tarea 1');
    const t2 = createTask('Tarea 2');
    const list = removeTask([t1, t2], t1.id);
    expect(list).toHaveLength(1);
    expect(list[0].text).toBe('Tarea 2');
  });

  it('devuelve lista vacía si se elimina la única tarea', () => {
    const task = createTask('Única');
    const list = removeTask([task], task.id);
    expect(list).toHaveLength(0);
  });
});

describe('getStats', () => {
  it('devuelve todo a cero con lista vacía', () => {
    const stats = getStats([]);
    expect(stats).toEqual({ total: 0, done: 0, pending: 0 });
  });

  it('cuenta correctamente tareas completadas y pendientes', () => {
    const tasks = [
      { id: 1, text: 'A', done: true },
      { id: 2, text: 'B', done: false },
      { id: 3, text: 'C', done: true },
    ];
    const stats = getStats(tasks);
    expect(stats).toEqual({ total: 3, done: 2, pending: 1 });
  });
});

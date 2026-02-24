/**
 * tasks.js — Lógica de gestión de tareas (funciones puras, sin DOM).
 *
 * Este módulo se puede testear de forma aislada con Vitest.
 */

let _nextId = 0;

/**
 * Crea una nueva tarea.
 * @param {string} text - Texto de la tarea.
 * @returns {{ id: number, text: string, done: boolean }}
 */
export function createTask(text) {
  const trimmed = text.trim();
  if (!trimmed) throw new Error('El texto de la tarea no puede estar vacío');
  return {
    id: ++_nextId,
    text: trimmed,
    done: false
  };
}

/**
 * Añade una tarea a la lista y devuelve una nueva lista (inmutable).
 * @param {Array} list
 * @param {{ id: number, text: string, done: boolean }} task
 * @returns {Array}
 */
export function addTask(list, task) {
  return [...list, task];
}

/**
 * Cambia el estado done de una tarea por su id.
 * @param {Array} list
 * @param {number} id
 * @returns {Array}
 */
export function toggleTask(list, id) {
  return list.map(t => (t.id === id ? { ...t, done: !t.done } : t));
}

/**
 * Elimina una tarea por su id.
 * @param {Array} list
 * @param {number} id
 * @returns {Array}
 */
export function removeTask(list, id) {
  return list.filter(t => t.id !== id);
}

/**
 * Calcula estadísticas de la lista.
 * @param {Array} list
 * @returns {{ total: number, done: number, pending: number }}
 */
export function getStats(list) {
  const total = list.length;
  const done = list.filter(t => t.done).length;
  return { total, done, pending: total - done };
}

import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';

const TaskList = ({ onEditTask, onViewTask, onRefresh }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      console.log("Données récupérées:", data);
      setTasks(data);
      setLoading(false);
      // Ne pas appeler onRefresh ici pour éviter la boucle infinie
    } catch (err) {
      console.error("Erreur complète:", err);
      setError('Erreur lors du chargement des tâches');
      setLoading(false);
    }
  };

  // Utiliser un tableau de dépendances vide pour n'exécuter fetchTasks qu'une seule fois
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      try {
        await taskService.deleteTask(id);
        // Rafraîchir la liste après suppression
        fetchTasks();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        setError('Erreur lors de la suppression de la tâche');
      }
    }
  };

  const toggleTaskStatus = async (task) => {
    try {
      await taskService.updateTask(task.id, { 
        ...task, 
        completed: !task.completed 
      });
      fetchTasks();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      setError('Erreur lors de la mise à jour du statut');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="task-list">
      <h2>Liste des tâches</h2>
      {tasks.length === 0 ? (
        <p>Aucune tâche disponible</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <div className="task-content">
                <span className="task-title" onClick={() => onViewTask && onViewTask(task.id)}>
                  {task.title}
                </span>
                <span 
                  className="task-status" 
                  onClick={() => toggleTaskStatus(task)}
                  title={task.completed ? "Marquer comme non terminée" : "Marquer comme terminée"}
                >
                  {task.completed ? '✅' : '⏳'}
                </span>
              </div>
              <div className="task-actions">
                <button onClick={() => onEditTask && onEditTask(task)}>Modifier</button>
                <button onClick={() => handleDelete(task.id)} className="delete-button">Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

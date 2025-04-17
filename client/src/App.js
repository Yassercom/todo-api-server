import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetail from './components/TaskDetail';
import TaskEditForm from './components/TaskEditForm';
import './App.css';

function App() {
  const [view, setView] = useState('list'); // 'list', 'detail', 'edit'
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Gestionnaire pour l'ajout d'une nouvelle tâche
  const handleTaskAdded = () => {
    // Rafraîchir la liste et revenir à la vue liste
    setView('list');
  };

  // Gestionnaire pour la mise à jour d'une tâche
  const handleTaskUpdated = () => {
    // Rafraîchir la liste et revenir à la vue liste
    setView('list');
  };

  // Gestionnaire pour afficher les détails d'une tâche
  const handleViewTask = (taskId) => {
    setSelectedTaskId(taskId);
    setView('detail');
  };

  // Gestionnaire pour éditer une tâche
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setView('edit');
  };

  // Gestionnaire pour revenir à la liste
  const handleBackToList = () => {
    setView('list');
    setSelectedTask(null);
    setSelectedTaskId(null);
  };

  // Rendu conditionnel en fonction de la vue active
  const renderView = () => {
    switch (view) {
      case 'detail':
        return (
          <TaskDetail 
            taskId={selectedTaskId} 
            onBack={handleBackToList} 
          />
        );
      case 'edit':
        return (
          <TaskEditForm 
            task={selectedTask} 
            onTaskUpdated={handleTaskUpdated} 
            onCancel={handleBackToList} 
          />
        );
      case 'list':
      default:
        return (
          <>
            <TaskForm onTaskAdded={handleTaskAdded} />
            <TaskList 
              onEditTask={handleEditTask}
              onViewTask={handleViewTask}
            />
          </>
        );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestionnaire de Tâches</h1>
      </header>
      <main>
        {renderView()}
      </main>
    </div>
  );
}

export default App;

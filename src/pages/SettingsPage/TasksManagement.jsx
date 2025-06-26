// src/pages/SettingsPage/TasksManagement.jsx
import React, { useState } from 'react';
import { 
  CheckSquare, Plus, Search, Edit, Trash2, MoreVertical,
  Calendar, Users, Eye, X, Save, AlertCircle, CheckCircle2, 
  Clock, Timer
} from 'lucide-react';
import { useRoles } from '@/context/RoleContext';

const TaskCard = ({ task, onEdit, onDelete, onView }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { getRolesByTask } = useRoles();

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'active':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'in progress':
        return <Timer className="w-4 h-4 text-blue-500" />;
      case 'planning':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'not started':
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
      default:
        return <CheckSquare className="w-4 h-4 text-gray-400" />;
    }
  };

  // Obtenir les rôles assignés à cette tâche
  const assignedRoles = getRolesByTask(task.id);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <CheckSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(task.status)}
            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority || 'Normal'}
            </span>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-all"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-10">
              <button
                onClick={() => { onView(task); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Voir
              </button>
              <button
                onClick={() => { onEdit(task); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Modifier
              </button>
              <button
                onClick={() => { onDelete(task.id); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
        {task.name}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
        {task.description || 'Aucune description fournie pour cette tâche.'}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{assignedRoles.length} rôle{assignedRoles.length > 1 ? 's' : ''}</span>
        </div>
        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          {task.status || 'Non défini'}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Créée le {new Date().toLocaleDateString('fr-FR')}</span>
        </div>
      </div>
    </div>
  );
};

const TaskModal = ({ task, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: task?.name || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    status: task?.status || 'not started'
  });

  const priorityOptions = [
    { value: 'low', label: 'Faible', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
    { value: 'medium', label: 'Moyenne', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
    { value: 'high', label: 'Élevée', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' }
  ];

  const statusOptions = [
    { value: 'not started', label: 'Non commencée' },
    { value: 'planning', label: 'En planification' },
    { value: 'in progress', label: 'En cours' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Terminée' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {task ? 'Modifier la tâche' : 'Créer une nouvelle tâche'}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom de la tâche *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez le nom de la tâche"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Description de la tâche (optionnel)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priorité
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {priorityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Statut
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                {task ? 'Mettre à jour' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function TasksManagement() {
  // Pour cette démonstration, on utilise des données mock
  // Dans la vraie app, cela viendrait du contexte GroupsContext
  const [tasks, setTasks] = useState([
    { id: 1, name: "Refonte UI/UX", description: "Redesign de l'interface utilisateur", priority: "High", status: "In Progress" },
    { id: 2, name: "Optimisation Performance", description: "Amélioration des performances frontend", priority: "Medium", status: "Planning" },
    { id: 3, name: "API Development", description: "Développement des APIs REST", priority: "High", status: "In Progress" },
    { id: 4, name: "Strategic Planning", description: "Planification stratégique Q2", priority: "High", status: "Active" },
    { id: 5, name: "Database Migration", description: "Migration vers nouvelle base de données", priority: "Medium", status: "Planning" },
    { id: 6, name: "Security Audit", description: "Audit de sécurité complet", priority: "High", status: "Not Started" }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleCreate = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  const handleSave = (taskData) => {
    if (editingTask) {
      // Modifier une tâche existante
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData }
          : task
      ));
    } else {
      // Créer une nouvelle tâche
      const newTask = {
        id: Date.now(),
        ...taskData
      };
      setTasks(prev => [...prev, newTask]);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status?.toLowerCase() === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority?.toLowerCase() === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status?.toLowerCase() === status).length;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des tâches
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Créez et gérez les tâches de votre organisation
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouvelle tâche
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une tâche..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="not started">Non commencées</option>
            <option value="planning">En planification</option>
            <option value="in progress">En cours</option>
            <option value="active">Actives</option>
            <option value="completed">Terminées</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Toutes les priorités</option>
            <option value="low">Faible</option>
            <option value="medium">Moyenne</option>
            <option value="high">Élevée</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <CheckSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{tasks.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total tâches</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Timer className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{getTasksByStatus('in progress')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">En cours</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{getTasksByStatus('completed')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Terminées</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{tasks.filter(t => t.priority?.toLowerCase() === 'high').length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Priorité élevée</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={() => console.log('Voir tâche:', task)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckSquare className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchTerm || filterStatus !== 'all' || filterPriority !== 'all' ? 'Aucune tâche trouvée' : 'Aucune tâche créée'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
              ? 'Essayez de modifier vos critères de recherche pour voir plus de résultats.'
              : 'Commencez par créer votre première tâche pour organiser le travail de vos équipes.'
            }
          </p>
          {(!searchTerm && filterStatus === 'all' && filterPriority === 'all') && (
            <button
              onClick={handleCreate}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Créer votre première tâche
            </button>
          )}
        </div>
      )}

      {/* Modal */}
      <TaskModal
        task={editingTask}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </div>
  );
}

export default TasksManagement;
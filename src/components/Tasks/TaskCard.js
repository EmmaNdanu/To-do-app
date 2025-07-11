const TaskCard = ({ task }) => {
  const isOverdue = new Date(task.date) < new Date();
  const getBgColor = () => {
    if (task.category === 'Home') return 'bg-red-500';
    if (task.category === 'Health/Fitness') return 'bg-yellow-400';
    if (task.category === 'Education') return 'bg-green-500';
    return 'bg-gray-200';
  };

  return (
    <div className={`${getBgColor()} text-white p-4 rounded-xl mb-3`}>
      <div className="flex justify-between">
        <h3 className="font-bold">{task.title}</h3>
        <span className="text-xs">{new Date(task.date).toLocaleDateString()}</span>
      </div>
      <p>{task.description}</p>
      <p className="text-sm mt-2">
        ⏰ {new Date(task.date).toLocaleString()} • 
        {isOverdue ? (
          <span className="text-xs ml-1">Not completed on time</span>
        ) : (
          <span className="text-xs ml-1">On time</span>
        )}
      </p>
      <span className="text-xs inline-block mt-2 px-2 py-1 bg-white text-black rounded">
        {task.category}
      </span>
    </div>
  );
};

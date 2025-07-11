import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCard = ({ totalTasks, completedTasks }) => {
  const percentage = Math.round((completedTasks / totalTasks) * 100);
  return (
    <div className="p-4 bg-dark rounded-xl flex items-center space-x-4">
      <div className="w-16 h-16">
        <CircularProgressbar value={percentage} text={`${percentage}%`} />
      </div>
      <div>
        <h4 className="font-bold">{`You have ${totalTasks} tasks to complete.`}</h4>
        <p className="text-sm text-gray-400">
          {completedTasks === 0 ? 'No tasks completed yet. Keep going!' : `${completedTasks} tasks completed.`}
        </p>
      </div>
    </div>
  );
};

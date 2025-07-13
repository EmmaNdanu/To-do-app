const Header = ({ userName }) => (
  <div className="flex justify-between items-center">
    <div>
      <h2 className="text-xl font-bold">👋 Good morning, {userName}</h2>
      <p className="text-sm text-gray-400">Embrace the power of productivity!</p>
    </div>
    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-lg">
      {userName.charAt(0)}
    </div>
  </div>
);

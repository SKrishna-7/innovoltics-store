import { FaHome, FaBox, FaShoppingCart, FaUsers, FaCube, FaEnvelope, FaChartLine, FaSun, FaMoon, FaUserPlus  } from 'react-icons/fa';

export default function Sidebar({ setActiveTab, toggleTheme, darkMode }) {
  return (
    <aside className="w-16 sm:w-64 bg-white dark:bg-gray-800 shadow-lg p-4 flex flex-col h-screen">
      <h1 className="hidden sm:block text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400 mb-6">Innovoltics</h1>
      <nav className="flex-1">
        <ul className="space-y-2">
          {[
            { icon: <FaHome />, label: 'Overview', value: 'overview' },
            { icon: <FaBox />, label: 'Products', value: 'products' },
            { icon: <FaShoppingCart />, label: 'Orders', value: 'orders' },
            // { icon: <FaUsers />, label: 'Users', value: 'users' },
            // { icon: <FaCube />, label: '3D Models', value: 'models' },
            { icon: <FaEnvelope />, label: 'Messages', value: 'messages' },
            { icon: <FaUserPlus />, label: 'Add Admin', value: 'signup' },
            // { icon: <FaChartLine />, label: 'Analytics', value: 'analytics' },
          ].map((item) => (
            <li key={item.value}>
              <button
                onClick={() => setActiveTab(item.value)}
                className="w-full flex flex-col sm:flex-row items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-700 rounded-md"
              >
                {item.icon}
                <span className="mt-1 sm:mt-0 sm:ml-3 hidden sm:block">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <button onClick={toggleTheme} className="mt-4 p-2 flex items-center justify-center bg-purple-100 dark:bg-gray-700 rounded-md">
        {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-400" />}
      </button>
    </aside>
  );
}
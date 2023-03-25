import DashboardIcon from '../assets/icons/dashboard.png';
import users from '../assets/icons/users.png';
import citation from '../assets/icons/citation.png';
import settings from '../assets/icons/settings.png';

const sidebar_menu = [
    {
        id: 1,
        icon: citation,
        path: '/citation',
        title: 'Citations',
    },
    {
        id: 2,
        icon: DashboardIcon,
        path: '/history',
        title: 'History',
    },
    {
        id: 3,
        icon: users,
        path: '/users',
        title: 'Users',
    },
    {
        id: 4,
        icon: settings,
        path: '/admin-settings',
        title: 'Admin Settings',
    }
]

export default sidebar_menu;
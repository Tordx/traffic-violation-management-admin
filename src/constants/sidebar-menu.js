import DashboardIcon from '../assets/icons/dashboard.png';
import ShippingIcon from '../assets/icons/users.png';
import ProductIcon from '../assets/icons/citation.png';
import UserIcon from '../assets/icons/settings.png';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/dashboard',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: ProductIcon,
        path: '/citation',
        title: 'Citations',
    },
    {
        id: 3,
        icon: ShippingIcon,
        path: '/users',
        title: 'Users',
    },
    {
        id: 4,
        icon: UserIcon,
        path: '/admin-settings',
        title: 'Admin Settings',
    }
]

export default sidebar_menu;
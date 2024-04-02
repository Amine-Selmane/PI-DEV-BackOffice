import * as Icon from 'react-feather';

const SidebarData = [
  { caption: 'Personal' },
  
    {
      title: 'Book Store',
      href: '/books',
      icon: <Icon.Book />,
      id: 1.2,
      collapsible: false, // Corrected spelling from 'collapisble' to 'collapsible'
    },
  
    {
      title: 'Orders',
      href: '/orders',
      icon: <Icon.ShoppingCart />,
      id: 1.2,
      collapsible: false, // Corrected spelling from 'collapisble' to 'collapsible'
    },
  
  
 
];

export default SidebarData;

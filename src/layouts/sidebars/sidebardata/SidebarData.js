import * as Icon from 'react-feather';

const SidebarData = [
  { caption: 'User Management' },
  {
    title: 'User Table',
    href: '/tables/user-table',
    icon: <Icon.UserCheck />,
    id: 4.1,
    collapisble: false,
  },
  {
    title: 'Disponibilite Table',
    href: '/tables/disponibilite-table',
    icon: <Icon.UserCheck />,
    id: 4.1,
    collapisble: false,
  },
  {
    title: 'Payment Table',
    href: '/tables/payment-table',
    icon: <Icon.UserCheck />,
    id: 4.1,
    collapisble: false,
  },
 
  { caption: 'Event Management' },
  {
    title: 'Event',
    href: '/Events',
    icon: <Icon.Disc />,
    id: 1.2,
    collapisble: false,
  },
  {
    title: 'Reservations',
    href: '/Reservations',
    icon: <Icon.Disc />,
    id: 1.2,
    collapisble: false,
  },
 { caption: 'Report Management' },
  {
    title: 'Reports',
    href: '/reports',
    icon: <Icon.FileText />,
    id: 2.1,
    collapisble: false,
  },
  {
    title: 'Claim',
    href: '/claims',
    icon: <Icon.FileText />,
    id: 2.1,
    collapisble: false,
  },
  // {
  //   title: 'Question',
  //   href: '/questions',
  //   icon: <Icon.FileText />,
  //   id: 2.1,
  //   collapisble: false,
  // },
 
  { caption: 'Courses Management' },
 
  {
    title: 'Courses',
    href: '/courses',
    icon: <Icon.Book />,
    id: 2.6,
    collapisble: false,
  },
  { caption: 'Schedule Managment' },
 
  {
    title: 'Schedules',
    href: '/schedules',
    icon: <Icon.Calendar />,
    id: 2.7,
    collapisble: false,
  },
  

 
  
  { caption: 'Books Management' },
    {
      title: 'Book Store',
      href: '/books',
      icon: <Icon.Book />,
      id: 1.2,
      collapsible: false, // Corrected spelling from 'collapisble' to 'collapsible'
    },
    {
      title: 'Rating Analysis',
      href: '/ratings',
      icon: <Icon.Star />,
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

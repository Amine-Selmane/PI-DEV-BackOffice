import * as Icon from 'react-feather';

const SidebarData = [
  { caption: 'Personal' },
  {
    title: 'Dashboards',
    href: '/dashboards',
    id: 1,
    suffix: '4',
    suffixColor: 'bg-cyan rounded-pill text-dark-white',
    icon: <Icon.Home />,
    collapisble: true,
    children: [
      {
        title: 'Minimal',
        href: '/dashboards/minimal',
        icon: <Icon.Disc />,
        id: 1.1,
        collapisble: false,
      },
      
    ],
  },
  
  
  { caption: 'Tables' },
  {
    title: 'User Table',
    href: '/tables/user-table',
    icon: <Icon.Codepen />,
    id: 4.1,
    collapisble: false,
  },
  {
    title: 'Disponibilite Table',
    href: '/tables/disponibilite-table',
    icon: <Icon.Codepen />,
    id: 4.1,
    collapisble: false,
  },
  
 
  
];

export default SidebarData;

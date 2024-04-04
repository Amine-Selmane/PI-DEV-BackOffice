import * as Icon from 'react-feather';

const SidebarData = [
  { caption: 'Personal' },
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
      {
        title: 'Analytical',
        href: '/dashboards/analytical',
        icon: <Icon.Disc />,
        id: 1.2,
        collapisble: false,
      },
  
      {
        title: 'Demographical',
        href: '/dashboards/demographical',
        icon: <Icon.Disc />,
        id: 1.3,
        collapisble: false,
      },
      {
        title: 'Modern',
        href: '/dashboards/modern',
        icon: <Icon.Disc />,
        id: 1.4,
        collapisble: false,
      },
    ],
  },{ caption: 'Management' },
  {
    title: 'Reports',
    href: '/reports',
    icon: <Icon.FileText />,
    id: 2.1,
    collapisble: false,
  },
  {
    title: 'Quiz',
    href: '/quiz',
    icon: <Icon.FileText />,
    id: 2.1,
    collapisble: false,
  },
  {
    title: 'Question',
    href: '/questions',
    icon: <Icon.FileText />,
    id: 2.1,
    collapisble: false,
  },
  { caption: 'Apps' },
  {
    title: 'Notes',
    href: '/apps/notes',
    icon: <Icon.FileText />,
    id: 2.1,
    collapisble: false,
  },
  {
    title: 'Chat',
    href: '/apps/chat',
    icon: <Icon.MessageCircle />,
    id: 2.2,
    collapisble: false,
  },
  {
    title: 'Contacts',
    href: '/apps/contacts',
    icon: <Icon.User />,
    id: 2.3,
    collapisble: false,
  },
  {
    title: 'Calendar',
    href: '/apps/calendar',
    icon: <Icon.Calendar />,
    id: 2.4,
    collapisble: false,
  },
  {
    title: 'Email',
    href: '/apps/email',
    icon: <Icon.Mail />,
    suffix: 'New',
    suffixColor: 'bg-primary rounded-pill text-dark-white',
    id: 2.5,
    collapisble: false,
  },
  {
    title: 'Courses',
    href: '/courses',
    icon: <Icon.Book />,
    id: 2.6,
    collapisble: false,
  },
  {
    title: 'Ecommerce',
    href: '/ecom',
    icon: <Icon.ShoppingCart />,
    id: 2.7,
    collapisble: true,
    children: [
      {
        title: 'Shop',
        href: '/ecom/shop',
        icon: <Icon.Disc />,
      },
      {
        title: 'Shop Detail',
        href: '/ecom/shopdetail',
        icon: <Icon.Disc />,
      },
    ],
  },
  {
    title: 'Ticket',
    href: '/tickt',
    icon: <Icon.Bookmark />,
    id: 2.8,
    collapisble: true,
    children: [
      {
        title: 'Ticket List',
        href: '/tickt/ticket-list',
        icon: <Icon.Disc />,
      },
      {
        title: 'Ticket Detail',
        href: '/tickt/ticket-detail',
        icon: <Icon.Disc />,
      },
    ],
  },
  {
    title: 'TreeView',
    href: '/apps/treeview',
    icon: <Icon.Triangle />,
    id: 2.9,
    collapisble: false,
  },
  { caption: 'UI' },
  {
    title: 'UI Elements',
    href: '/ui',
    id: 2,
    suffix: '22',
    suffixColor: 'bg-info rounded-pill text-dark-white',
    icon: <Icon.Cpu />,
    collapisble: true,
    children: [
      {
        title: 'Alert',
        href: '/ui/alerts',
        icon: <Icon.Disc />,
      },
      {
        title: 'Badges',
        href: '/ui/badges',
        icon: <Icon.Disc />,
      },
      {
        title: 'Buttons',
        href: '/ui/buttons',
        icon: <Icon.Disc />,
      },
      {
        title: 'Button Group',
        href: '/ui/button-group',
        icon: <Icon.Disc />,
      },
      {
        title: 'Breadcrumbs',
        href: '/ui/breadcrumbs',
        icon: <Icon.Disc />,
      },
      {
        title: 'Cards',
        href: '/ui/cards',
        icon: <Icon.Disc />,
      },
      {
        title: 'Collapse',
        href: '/ui/collapse',
        icon: <Icon.Disc />,
      },
      {
        title: 'Dropdown',
        href: '/ui/dropdown',
        icon: <Icon.Disc />,
      },
      {
        title: 'Grid',
        href: '/ui/grid',
        icon: <Icon.Disc />,
      },
      {
        title: 'List Group',
        href: '/ui/list-group',
        icon: <Icon.Disc />,
      },
      {
        title: 'Modal',
        href: '/ui/modal',
        icon: <Icon.Disc />,
      },
      {
        title: 'Navbar',
        href: '/ui/navbar',
        icon: <Icon.Disc />,
      },
      {
        title: 'Navs',
        href: '/ui/nav',
        icon: <Icon.Disc />,
      },
      {
        title: 'Pagination',
        href: '/ui/pagination',
        icon: <Icon.Disc />,
      },
      {
        title: 'Popover',
        href: '/ui/popover',
        icon: <Icon.Disc />,
      },
      {
        title: 'Progress',
        href: '/ui/progress',
        icon: <Icon.Disc />,
      },
      {
        title: 'Spinner',
        href: '/ui/spinner',
        icon: <Icon.Disc />,
      },
      {
        title: 'Tabs',
        href: '/ui/tabs',
        icon: <Icon.Disc />,
      },
      {
        title: 'Toasts',
        href: '/ui/toasts',
        icon: <Icon.Disc />,
      },
      {
        title: 'Tooltip',
        href: '/ui/tooltip',
        icon: <Icon.Disc />,
      },
    ],
  },
  { caption: 'Forms' },
  {
    title: 'Form Layouts',
    href: '/form-layout',
    icon: <Icon.FileText />,
    id: 3.1,
    collapisble: true,
    children: [
      {
        title: 'Basic Forms',
        href: '/form-layout/form-basic',
        icon: <Icon.Disc />,
      },
      {
        title: 'Form Grid',
        href: '/form-layout/form-grid',
        icon: <Icon.Disc />,
      },
      {
        title: 'Form Group',
        href: '/form-layout/form-group',
        icon: <Icon.Disc />,
      },
      {
        title: 'Form Input',
        href: '/form-layout/form-input',
        icon: <Icon.Disc />,
      },
    ],
  },
  {
    title: 'Form Pickers',
    href: '/form-pickers',
    icon: <Icon.Droplet />,
    id: 3.2,
    collapisble: true,
    children: [
      {
        title: 'Datepicker',
        href: '/form-pickers/datepicker',
        icon: <Icon.Disc />,
      },
      {
        title: 'Tags & Select',
        href: '/form-pickers/tag-select',
        icon: <Icon.Disc />,
      },
    ],
  },
  {
    title: 'Form Validation',
    href: '/form-validation',
    icon: <Icon.CheckSquare />,
    id: 3.3,
    collapisble: false,
  },
  {
    title: 'Form Steps',
    href: '/form-steps',
    icon: <Icon.CreditCard />,
    id: 3.4,
    collapisble: false,
  },
  {
    title: 'Form Editor',
    href: '/form-editor',
    icon: <Icon.Edit />,
    id: 3.5,
    collapisble: false,
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

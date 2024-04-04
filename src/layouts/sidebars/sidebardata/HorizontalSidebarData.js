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
  { caption: 'Apps' },
  {
    title: 'Apps',
    href: '/apps',
    id: 2,
    icon: <Icon.Grid />,
    ddType: 'two-column',
    collapisble: true,
    children: [
      {
        title: 'Notes',
        href: '/apps/notes',
        icon: <Icon.FileText />,
      },
      {
        title: 'Chat',
        href: '/apps/chat',
        icon: <Icon.MessageCircle />,
      },
      {
        title: 'Contacts',
        href: '/apps/contacts',
        icon: <Icon.User />,
      },
      {
        title: 'Calendar',
        href: '/apps/calendar',
        icon: <Icon.Calendar />,
      },
      {
        title: 'Email',
        href: '/apps/email',
        icon: <Icon.Mail />,
      },
      {
        title: 'Courses',
        href: '/courses',
        icon: <Icon.Book />,
      },
      {
        title: 'Shop',
        href: '/ecom/shop',
        icon: <Icon.ShoppingBag />,
      },
      {
        title: 'Shop Detail',
        href: '/ecom/shopdetail',
        icon: <Icon.ShoppingCart />,
      },
      {
        title: 'Ticket List',
        href: '/tickt/ticket-list',
        icon: <Icon.Bookmark />,
      },
      {
        title: 'Ticket Detail',
        href: '/tickt/ticket-detail',
        icon: <Icon.Bookmark />,
      },
      {
        title: 'TreeView',
        href: '/apps/treeview',
        icon: <Icon.GitMerge />,
      },
    ],
  },
  { caption: 'UI' },
  {
    title: 'UI',
    href: '/ui',
    id: 3,
    suffix: '22',
    suffixColor: 'bg-danger',
    ddType: 'mega-dropdown',
    icon: <Icon.Cpu />,
    collapisble: true,
    children: [
      {
        title: 'Alert',
        href: '/ui/alerts',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Badges',
        href: '/ui/badges',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Buttons',
        href: '/ui/buttons',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Button Group',
        href: '/ui/button-group',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Breadcrumbs',
        href: '/ui/breadcrumbs',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Cards',
        href: '/ui/cards',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Collapse',
        href: '/ui/collapse',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Dropdown',
        href: '/ui/dropdown',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Grid',
        href: '/ui/grid',
        icon: <Icon.Droplet />,
      },
      {
        title: 'List Group',
        href: '/ui/list-group',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Modal',
        href: '/ui/modal',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Navbar',
        href: '/ui/navbar',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Navs',
        href: '/ui/nav',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Pagination',
        href: '/ui/pagination',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Popover',
        href: '/ui/popover',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Progress',
        href: '/ui/progress',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Spinner',
        href: '/ui/spinner',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Tabs',
        href: '/ui/tabs',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Toasts',
        href: '/ui/toasts',
        icon: <Icon.Droplet />,
      },
      {
        title: 'Tooltip',
        href: '/ui/tooltip',
        icon: <Icon.Droplet />,
      },
    ],
  },
  { caption: 'Forms' },
  {
    title: 'Forms',
    href: '/forms',
    icon: <Icon.FileText />,
    id: 4,
    collapisble: true,
    children: [
      {
        title: 'Basic Forms',
        href: '/form-layout/form-basic',
        icon: <Icon.Columns />,
      },
      {
        title: 'Form Grid',
        href: '/form-layout/form-grid',
        icon: <Icon.Octagon />,
      },
      {
        title: 'Form Group',
        href: '/form-layout/form-group',
        icon: <Icon.Archive />,
      },
      {
        title: 'Form Input',
        href: '/form-layout/form-input',
        icon: <Icon.Edit3 />,
      },
      {
        title: 'Datepicker',
        href: '/form-pickers/datepicker',
        icon: <Icon.Calendar />,
      },
      {
        title: 'Tags & Select',
        href: '/form-pickers/tag-select',
        icon: <Icon.Tag />,
      },
      {
        title: 'Form Validation',
        href: '/form-validation',
        icon: <Icon.CheckSquare />,
      },
      {
        title: 'Form Steps',
        href: '/form-steps',
        icon: <Icon.CreditCard />,
      },
      {
        title: 'Form Editor',
        href: '/form-editor',
        icon: <Icon.Edit />,
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

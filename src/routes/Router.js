import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/loader/Loadable';
import  AuthorizeUser  from '../middlware/auth';

/** auth middlware */
// import  {AuthorizeUser,ProtectRoute} from './middlware/auth.js';

import ReportList from '../views/reports/ReportList';
import ReportForm from '../views/reports/ReportForm';
import UpdateReport from '../views/reports/UpdateReport';
import QuizList from '../views/quiz/QuizList';
import QuizForm from '../views/quiz/QuizForm';
import UpdateQuiz from '../views/quiz/UpdateQuiz';
import QuestionList from '../views/questions/QuestionList';
import QuestionForm from '../views/questions/QuestionForm';
import UpdateQuestion from '../views/questions/UpdateQuestion';
import StudentStatistics from '../views/reports/StudentStatistics';

import ShowBook from '../components/apps/Books Management/pages/ShowBook';
import BookManagement from '../components/apps/Books Management/pages/BookManagement';
import CreateBooks from '../components/apps/Books Management/pages/CreateBook';
import UpdateBook from '../components/apps/Books Management/pages/updateBook';
import OrderManagement from '../components/apps/Orders/OrderManagement';
import CreateOrder from '../components/apps/Orders/CreateOrder';
import UpdateOrder from '../components/apps/Orders/UpdateOrder';

/****Layouts*****/
const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));
/***** Pages ****/

const Minimal = Loadable(lazy(() => import('../views/dashboards/Minimal')));
const Analytical = Loadable(lazy(() => import('../views/dashboards/Analytical')));
const Demographical = Loadable(lazy(() => import('../views/dashboards/Demographical')));
const Modern = Loadable(lazy(() => import('../views/dashboards/Modern')));

/***** Apps ****/
const Chat = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/CalendarApp')));
const Shop = Loadable(lazy(() => import('../views/apps/Orders/Shop')));
const ShopDetail = Loadable(lazy(() => import('../views/apps/Orders/ShopDetail')));
const Treeview = Loadable(lazy(() => import('../views/apps/treeview/TreeView')));
const TicketList = Loadable(lazy(() => import('../views/apps/ticket/TicketList')));
const TicketDetail = Loadable(lazy(() => import('../views/apps/ticket/TicketDetail')));

/***** Ui Elements ****/
const Alerts = Loadable(lazy(() => import('../views/ui/Alerts')));
const Badges = Loadable(lazy(() => import('../views/ui/Badges')));
const Buttons = Loadable(lazy(() => import('../views/ui/Buttons')));
const Cards = Loadable(lazy(() => import('../views/ui/Cards')));
const Grid = Loadable(lazy(() => import('../views/ui/Grid')));
const Tables = Loadable(lazy(() => import('../views/ui/Tables')));
const Forms = Loadable(lazy(() => import('../views/ui/Forms')));
const Breadcrumbs = Loadable(lazy(() => import('../views/ui/Breadcrumbs')));
const Dropdowns = Loadable(lazy(() => import('../views/ui/DropDown')));
const BtnGroup = Loadable(lazy(() => import('../views/ui/BtnGroup')));
const Collapse = Loadable(lazy(() => import('../views/ui/Collapse')));
const ListGroup = Loadable(lazy(() => import('../views/ui/ListGroup')));
const Modal = Loadable(lazy(() => import('../views/ui/Modal')));
const Navbar = Loadable(lazy(() => import('../views/ui/Navbar')));
const Nav = Loadable(lazy(() => import('../views/ui/Nav')));
const Pagination = Loadable(lazy(() => import('../views/ui/Pagination')));
const Popover = Loadable(lazy(() => import('../views/ui/Popover')));
const Progress = Loadable(lazy(() => import('../views/ui/Progress')));
const Spinner = Loadable(lazy(() => import('../views/ui/Spinner')));
const Tabs = Loadable(lazy(() => import('../views/ui/Tabs')));
const Toasts = Loadable(lazy(() => import('../views/ui/Toasts')));
const Tooltip = Loadable(lazy(() => import('../views/ui/Tooltip')));
const EventCrud = Loadable(lazy(() => import('../Event/CRUD')));
const EventAdd = Loadable(lazy(() => import('../Event/addEvent')));
const Reservations = Loadable(lazy(() => import('../Event/Reservations')));
/***** Form Layout Pages ****/
const FormBasic = Loadable(lazy(() => import('../views/form-layouts/FormBasic')));
const FormGrid = Loadable(lazy(() => import('../views/form-layouts/FormGrid')));
const FormGroup = Loadable(lazy(() => import('../views/form-layouts/FormGroup')));
const FormInput = Loadable(lazy(() => import('../views/form-layouts/FormInput')));

/***** Form Pickers Pages ****/
const Datepicker = Loadable(lazy(() => import('../views/form-pickers/DateTimePicker')));
const TagSelect = Loadable(lazy(() => import('../views/form-pickers/TagSelect')));

/***** Form Validation Pages ****/
const AddUser = Loadable(lazy(() => import('../views/form-validation/AddUser')));
const UpdateUser = Loadable(lazy(() => import('../views/form-validation/UpdateUser')));
const AddDispo = Loadable(lazy(() => import('../views/form-validation/AddDispo')));
const UpdateDispo = Loadable(lazy(() => import('../views/form-validation/UpdateDispo')));
const FormSteps = Loadable(lazy(() => import('../views/form-steps/Steps')));
const FormEditor = Loadable(lazy(() => import('../views/form-editor/FormEditor')));
/***** Table Pages ****/
const Usertable = Loadable(lazy(() => import('../views/tables/TableUser')));

const Dispotable = Loadable(lazy(() => import('../views/tables/TableDispo')));
const CustomReactTable = Loadable(lazy(() => import('../views/tables/CustomReactTable')));
const ReactBootstrapTable = Loadable(lazy(() => import('../views/tables/ReactBootstrapTable')));

/***** Chart Pages ****/
const ApexCharts = Loadable(lazy(() => import('../views/charts/ApexCharts')));
const ChartJs = Loadable(lazy(() => import('../views/charts/ChartJs')));

/***** Sample Pages ****/
const StarterKit = Loadable(lazy(() => import('../views/sample-pages/StarterKit')));
const Profile = Loadable(lazy(() => import('../views/sample-pages/Profile')));
const Gallery = Loadable(lazy(() => import('../views/sample-pages/Gallery')));
const SearchResult = Loadable(lazy(() => import('../views/sample-pages/SearchResult')));
const HelperClass = Loadable(lazy(() => import('../views/sample-pages/HelperClass')));

/***** Icon Pages ****/
const Bootstrap = Loadable(lazy(() => import('../views/icons/Bootstrap')));
const Feather = Loadable(lazy(() => import('../views/icons/Feather')));

/***** Map Pages ****/
const CustomVectorMap = Loadable(lazy(() => import('../views/maps/CustomVectorMap')));

/***** Widget Pages ****/
const Widget = Loadable(lazy(() => import('../views/widget/Widget')));

/***** Courses ****/
const Courses = Loadable(lazy(() => import('../views/apps/courses/courses')));

/***** Auth Pages ****/
const Error = Loadable(lazy(() => import('../views/auth/Error')));
const RegisterFormik = Loadable(lazy(() => import('../views/auth/RegisterFormik')));
const LoginFormik = Loadable(lazy(() => import('../views/auth/LoginFormik')));
const Maintanance = Loadable(lazy(() => import('../views/auth/Maintanance')));
const LockScreen = Loadable(lazy(() => import('../views/auth/LockScreen')));
const RecoverPassword = Loadable(lazy(() => import('../views/auth/RecoverPassword')));

/*****Routes******/

const ThemeRoutes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', name: 'Home', element: <Navigate to="/dashboards/minimal" /> },
      { path: '/books', name: 'books', exact: true, element: <BookManagement /> },
      { path: '/books/details/:id', name: 'books', exact: true, element: <ShowBook /> },
      { path: '/books/create', name: 'books', exact: true, element: <CreateBooks /> },
      { path: '/books/update/:id', name: 'books', exact: true, element: <UpdateBook /> },
///orders

      { path: '/orders', name: 'orders', exact: true, element: < OrderManagement/> },
      { path: '/orders/create', name: 'books', exact: true, element: <CreateOrder /> },
      { path: '/orders/updateOrder/:id', name: 'books', exact: true, element: <UpdateOrder /> },





      { path: '/dashboards/minimal', name: 'Minimal', exact: true, element: <Minimal /> },
      { path: '/dashboards/analytical', name: 'Analytical', exact: true, element: <Analytical /> },
      { path: '/dashboards/demographical', name: 'Demographical', exact: true, element: <Demographical /> },
      { path: '/dashboards/modern', name: 'Modern', exact: true, element: <Modern /> },
      //{ path: '/management/reports', name: 'notes', exact: true, element: <Report /> },




      { path: '/apps/notes', name: 'notes', exact: true, element: <Notes /> },
      { path: '/apps/chat', name: 'chat', exact: true, element: <Chat /> },

      { path: '/apps/contacts', name: 'contacts', exact: true, element: <Contacts /> },
      { path: '/apps/calendar', name: 'calendar', exact: true, element: <Calendar /> },
      { path: '/ecom/shopdetail', name: 'email', exact: true, element: <ShopDetail /> },
      { path: '/tickt/ticket-list', name: 'ticket list', exact: true, element: <TicketList /> },
      {
        path: '/tickt/ticket-detail',
        name: 'ticket detail',
        exact: true,
        element: <TicketDetail />,
      },
      { path: '/apps/treeview', name: 'email', exact: true, element: <Treeview /> },
      { path: '/ui/alerts', name: 'alerts', exact: true, element: <Alerts /> },
      { path: '/ui/badges', name: 'badges', exact: true, element: <Badges /> },
      { path: '/ui/buttons', name: 'buttons', exact: true, element: <Buttons /> },
      { path: '/ui/cards', name: 'cards', exact: true, element: <Cards /> },
      { path: '/ui/grid', name: 'grid', exact: true, element: <Grid /> },
      { path: '/ui/table', name: 'table', exact: true, element: <Tables /> },
      { path: '/ui/forms', name: 'forms', exact: true, element: <Forms /> },
      { path: '/ui/breadcrumbs', name: 'breadcrumbs', exact: true, element: <Breadcrumbs /> },
      { path: '/ui/dropdown', name: 'dropdown', exact: true, element: <Dropdowns /> },
      { path: '/ui/button-group', name: 'button group', exact: true, element: <BtnGroup /> },
      { path: '/ui/collapse', name: 'collapse', exact: true, element: <Collapse /> },
      { path: '/ui/list-group', name: 'list-group', exact: true, element: <ListGroup /> },
      { path: '/ui/modal', name: 'modal', exact: true, element: <Modal /> },
      { path: '/ui/navbar', name: 'navbar', exact: true, element: <Navbar /> },
      { path: '/ui/nav', name: 'nav', exact: true, element: <Nav /> },
      { path: '/ui/pagination', name: 'pagination', exact: true, element: <Pagination /> },
      { path: '/ui/popover', name: 'popover', exact: true, element: <Popover /> },
      { path: '/ui/progress', name: 'progress', exact: true, element: <Progress /> },
      { path: '/ui/spinner', name: 'spinner', exact: true, element: <Spinner /> },
      { path: '/ui/tabs', name: 'tabs', exact: true, element: <Tabs /> },
      { path: '/ui/toasts', name: 'toasts', exact: true, element: <Toasts /> },
      { path: '/ui/tooltip', name: 'tooltip', exact: true, element: <Tooltip /> },
      { path: '/form-layout/form-basic', name: 'form-basic', exact: true, element: <FormBasic /> },
      { path: '/form-layout/form-grid', name: 'form-grid', exact: true, element: <FormGrid /> },
      { path: '/form-layout/form-group', name: 'form-group', exact: true, element: <FormGroup /> },
      { path: '/form-layout/form-input', name: 'form-input', exact: true, element: <FormInput /> },
      {
        path: '/form-pickers/datepicker',
        name: 'datepicker',
        exact: true,
        element: <Datepicker />,
      },
      { path: '/form-pickers/tag-select', name: 'tag-select', exact: true, element: <TagSelect /> },
      { path: '/addUser', name: 'form-validation', exact: true, element:<AuthorizeUser> <AddUser /> </AuthorizeUser>},
      { path: '/user-update/:UserId', name: 'user-update', exact: true, element:<AuthorizeUser> <UpdateUser /></AuthorizeUser> },
      { path: '/addDisponibilite', name: 'addDisponibilite', exact: true, element:<AuthorizeUser> <AddDispo /> </AuthorizeUser>},
      { path: '/disponibilite-update/:id', name: 'Disponibilite-update', exact: true, element:<AuthorizeUser> <UpdateDispo /></AuthorizeUser> },
      { path: '/form-steps', name: 'form-steps', exact: true, element: <FormSteps /> },
      { path: '/form-editor', name: 'form-editor', exact: true, element: <FormEditor /> },

      { path: '/tables/user-table', name: 'user-table', exact: true, element:<AuthorizeUser> <Usertable /> </AuthorizeUser>},

      { path: '/tables/disponibilite-table', name: 'disponibilite-table', exact: true, element:<AuthorizeUser> <Dispotable /> </AuthorizeUser>},
      {
        path: '/tables/react-table',
        name: 'react-table',
        exact: true,
        element: <CustomReactTable />,
      },
      {
        path: '/tables/data-table',
        name: 'data-table',
        exact: true,
        element: <ReactBootstrapTable />,
      },
      { path:"/question/update/:id" , name: 'question', exact: true, element: <UpdateQuestion/> },
     { path:"/question/new" , name: 'question', exact: true, element: <QuestionForm/> },
    { path:"/questions" , name: 'question', exact: true, element: <QuestionList /> },
      { path:"/quiz/update/:id" , name: 'quiz', exact: true, element: <UpdateQuiz/> },
     { path:"/quiz/new" , name: 'quiz', exact: true, element: <QuizForm/> },
    { path:"/quiz" , name: 'quiz', exact: true, element: <QuizList /> },
      { path:"/reports/update/:id" , name: 'report', exact: true, element: <UpdateReport/> },
     { path:"/reports/new" , name: 'report', exact: true, element: <ReportForm/> },
    { path:"/reports" , name: 'report', exact: true, element: <ReportList /> },
    { path:"/statistics" , name: 'report', exact: true, element: <StudentStatistics /> },
      { path: '/charts/apex', name: 'apex', exact: true, element: <ApexCharts /> },
      { path: '/charts/chartjs', name: 'chartjs', exact: true, element: <ChartJs /> },
      { path: '/sample-pages/profile', name: 'profile', exact: true, element:<AuthorizeUser> <Profile /> </AuthorizeUser>},
      {
        path: '/sample-pages/helper-class',
        name: 'helper-class',
        exact: true,
        element: <HelperClass />,
      },
      {
        path: '/sample-pages/starterkit',
        name: 'starterkit',
        exact: true,
        element: <StarterKit />,
      },
      { path: '/sample-pages/gallery', name: 'gallery', exact: true, element: <Gallery /> },
      {
        path: '/sample-pages/search-result',
        name: 'search-result',
        exact: true,
        element: <SearchResult />,
      },
      { path: '/icons/bootstrap', name: 'bootstrap', exact: true, element: <Bootstrap /> },
      { path: '/icons/feather', name: 'feather', exact: true, element: <Feather /> },
      { path: '/map/vector', name: 'vector', exact: true, element: <CustomVectorMap /> },
      { path: '/widget', name: 'widget', exact: true, element: <Widget /> },
      { path: '/courses', name: 'courses', exact: true, element: <Courses /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: 'registerformik', element: <RegisterFormik /> },
      { path: 'loginformik', element: <LoginFormik /> },
      { path: 'maintanance', element: <Maintanance /> },
      { path: 'lockscreen', element: <LockScreen /> },
      { path: 'recoverpwd', element: <RecoverPassword /> },
    ],
  },
];

export default ThemeRoutes;

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AddRestaurent from './pages/AddRestaurent';
import ManagerHomePage from './pages/ManagerHomePage';
import UserHomePage from './pages/UserHomePage';
import Orders from './pages/Orders';
import FoodItemsPage from './pages/FoodItemsPage';
import AddItem from './pages/AddItem';
import AllStaffDetailPage from './pages/AllStaffDetailPage';
import AddStaffPage from './pages/AddStaffPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';

import { loader as managerAuthLoader } from './auth/ManagerAuth';
import { loader as userAuthLoader } from './auth/UserAuth'
import { loader as staffAuthLoader } from './auth/StaffAuth';
import { loader as RestaurentDataLoader } from './pages/UserHomePage';
import { loader as staffDetails } from './pages/AllStaffDetailPage';
import { loader as foodItemLoader } from './pages/FoodItemsPage';
import { loader as profileLoader } from './pages/ProfilePage';

import { action as LoginAction } from './pages/LoginPage';
import { action as SignupAction } from './pages/SignUpPage';
import { action as AddRestaurentAction } from './pages/AddRestaurent';
import { action as AddStaffAction } from './pages/AddStaffPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />,
    action: LoginAction

  },
  {
    path: '/signup',
    element: <SignUpPage />,
    action: SignupAction
  },
  {
    path: '/addRestaurent',
    element: <AddRestaurent />,
    action: AddRestaurentAction
  },
  {
    path: '/managerHome',
    loader: managerAuthLoader,
    children: [
      {
        index: true,
        element: <ManagerHomePage homeURL={'/managerHome'} showStaff={true} />
      },
      {
        path: 'orders',
        element: <Orders homeURL={'/managerHome'} />
      },
      {
        path: 'foodItems',
        children: [
          { index: true, element: <FoodItemsPage homeURL={'/managerHome'} />, loader: foodItemLoader },
          { path: 'addItem', element: <AddItem homeURL={'/managerHome'} /> }
        ]
      },
      {
        path: 'staffDetails',
        children: [
          { index: true, element: <AllStaffDetailPage homeURL={'/managerHome'} />, loader: staffDetails },
          { path: 'addStaff', element: <AddStaffPage homeURL={'/managerHome'} />, action: AddStaffAction }
        ]
      }
    ]
  },
  {
    path: '/userHome',
    loader: userAuthLoader,
    children: [
      {
        index: true,
        element: <UserHomePage />,
        loader: RestaurentDataLoader
      },
    ]
  },
  {
    path: '/staffHome',
    loader: staffAuthLoader,
    children: [
      { index: true, element: <ManagerHomePage showStaff={false} /> },
      { path: 'orders', element: <Orders homeURL={'/staffHome'} /> },
      {
        path: 'foodItems',
        children: [
          { index: true, element: <FoodItemsPage homeURL={'/staffHome'} />, loader: foodItemLoader },
          { path: 'addItem', element: <AddItem homeURL={'/staffHome'} /> }
        ]
      },
    ]
  },
  {
    path: '/userProfile',
    element: <ProfilePage />,
    loader: profileLoader
  },
  {
    path: '/aboutUs',
    element: <AboutPage />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

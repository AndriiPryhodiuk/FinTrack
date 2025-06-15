import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Intro from "./components/Intro";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import GoalsPage from "./pages/GoalsPage";
import TransactionsPage from "./pages/TransactionsPage";
import ExpensesPage from "./pages/ExpensesPage";
import GoalDetailsPage from "./pages/GoalDetailsPage";
import CategoryTransactionsPage from "./pages/CategoryTransactionsPage";

// Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Actions
import { logoutAction } from "./actions/logout";

// Routes
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/app",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "goals",
        element: <GoalsPage />,
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
      },
      {
        path: "transactions/category/:category",
        element: <CategoryTransactionsPage />,
      },
      {
        path: "goal/:id",
        element: <GoalDetailsPage />,
        errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;

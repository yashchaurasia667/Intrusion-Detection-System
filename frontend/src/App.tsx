import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./App.css";

import MainLayout from "./layouts/MainLayout";
import FileResult from "./components/Scanner/FileResult";
import ScannedFiles from "./components/Scanner/ScannedFiles";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <main className="h-[100vh] bg-[#121212]">
            <MainLayout />
          </main>
        }
      >
        <Route path="/" element={<ScannedFiles />} />
        <Route path="/file" element={<FileResult />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

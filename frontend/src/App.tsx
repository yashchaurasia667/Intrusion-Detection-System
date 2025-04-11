import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./App.css";

import FileResult from "./components/Scanner/FileResult";
import ScannedFiles from "./components/Scanner/ScannedFiles";

import MainLayout from "./layouts/MainLayout";
import MainContextProvider from "./context/MainContextProvider";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <main className="h-[100vh] bg-[#121212]">
            <MainContextProvider>
              <MainLayout />
            </MainContextProvider>
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

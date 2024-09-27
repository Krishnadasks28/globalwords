import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Error from "./Pages/Error";
import { Provider } from "react-redux";
import store from "./Redux/store";

const Home = lazy(() => import("./Pages/Home"));
const Courses = lazy(() => import("./Pages/Courses"));
const SelectedCourse = lazy(() => import("./Pages/SelectedCourse"));

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/selectedCourse" element={<SelectedCourse />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </Provider>
  );
}

export default App;

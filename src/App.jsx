import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthLogin } from "./states/authLogin/action";
import Loading from "./components/Loading";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import CourseAddPage from "./pages/CourseAddPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import AddStudentPage from "./pages/AddStudentPage"; // Import AddStudentPage
import AddContentForm from "./pages/AddContentForm";
import StudentList from "./components/StudentList";
import ContentDetail from "./components/ContentDetail";


function App() {
  const { authLogin = null, isPreload = false } = useSelector(
    (states) => states
  );

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onAuthSignOut = () => {
    dispatch(asyncUnsetAuthLogin());
  };

  if (isPreload) {
    return null;
  }

  if (authLogin === null) {
    const activeRegister = location.pathname === "/register" ? "active" : "";
    const activeLogin = location.pathname !== "/register" ? "active" : "";

    return (
      <div>
        <header className="fixed-top">
          <Loading />
        </header>
        <div className="w-300px mx-auto mt-5">
          <div className="card shadow-sm">
            <div className="text-center py-2">
              <h2>D E L T A</h2>
            </div>
            <ul className="nav nav-pills mb-3">
              <li className="nav-item w-50 text-center">
                <Link className={`nav-link ${activeLogin} btl`} to="/">
                  Login
                </Link>
              </li>
              <li className="nav-item w-50 text-center">
                <Link
                  className={`nav-link ${activeRegister} btl`}
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </ul>
            <Routes>
              <Route path="/*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <header className="fixed-top">
          <Navigation authLogin={authLogin} onAuthSignOut={onAuthSignOut} />
          <Loading />
        </header>
        <main className="margin-main">
          <Routes>
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/users/me" element={<ProfilePage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/courses/add" element={<CourseAddPage />} />
            <Route path="/courses/:id/students" element={<StudentList />} />
            <Route path="/courses/:id/contents" element={<AddContentForm />} />
            <Route path="/courses/-/contents/:id" element={<ContentDetail/>}/>
            <Route
              path="/courses/:id/add-student"
              element={<AddStudentPage />}
            />{" "}
            {/* Route untuk AddStudentPage */}
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;

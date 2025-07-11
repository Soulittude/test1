import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LanguageSwitcher from './components/LanguageSwitcher';
import LogoutButton from './components/LogoutButton';
import LoginPage from './pages/LoginPage';
import InvoiceListPage from './pages/InvoiceListPage';
import InvoiceDetailPage from './pages/InvoiceDetailPage';

function PrivateRoute({ children }) {
  const user = useSelector(s => s.auth.user);
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const user = useSelector(s => s.auth.user);

  return (
    <BrowserRouter>
      {/* always show language switcher */}
      <LanguageSwitcher />

      {/* only show logout if we have a user */}
      {user && <LogoutButton />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/invoices"
          element={
            <PrivateRoute>
              <InvoiceListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/invoices/:id"
          element={
            <PrivateRoute>
              <InvoiceDetailPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

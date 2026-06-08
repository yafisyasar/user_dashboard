import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const UserListPage = lazy(() => import('../pages/UserListPage'))
const UserDetailPage = lazy(() => import('../pages/UserDetailPage'))

const PageLoader = () => (
  <div className="page-loader">
    <div className="spinner" />
    <span>Loading...</span>
  </div>
)

const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<UserListPage />} />
      <Route path="/users/:id" element={<UserDetailPage />} />
    </Routes>
  </Suspense>
)

export default AppRoutes

import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Article from './components/article/Article';
import Layout from './components/layout/Layout';
import ArticleWritePage from './components/article/ArticleWritePage';
import AuthPage from './pages/AuthPage';
import CreateAccountPage from './pages/CreateAccountPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AuthContext from './store/auth-context';
import ArticleList from './components/article/ArticleList';
import ArticleDetail from './components/article/ArticleDetail';

function App() {

  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup/*" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <CreateAccountPage /> } />
        <Route path="/login/*" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <AuthPage /> } />
        <Route path="/profile/*" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <ProfilePage /> }/>
        <Route element={ <Article />}>
          <Route path="/article/" element={ <ArticleList /> } />
          <Route path="/article/write" element={ <ArticleWritePage />} />
          <Route path="/article/detail/:articleId" element={ <ArticleDetail /> } />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;

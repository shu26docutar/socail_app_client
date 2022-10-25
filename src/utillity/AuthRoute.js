import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = (props) => {
    // コンポーネントを表示させるためには、returnが必要
    return props.authenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default AuthRoute

// 値の受け渡し処理は正常に完了
// しかし、ログイン後のauthenticatedの情報を取得し、更新することができない
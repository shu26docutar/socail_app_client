import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = (props) => {

    // コンポーネントを表示させるためには、returnが必要
    return props.authenticated ?  <Navigate to="/" replace /> : <Outlet />
}

export default AuthRoute

// リロードしないと、この処理が実行できないようになっているので要解消
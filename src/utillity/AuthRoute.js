import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = (props) => {

    // コンポーネントを表示させるためには、returnが必要
    return props.authenticated ?  <Navigate to="/" replace /> : <Outlet />
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

AuthRoute.propTypes = {
    user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(AuthRoute)

// リロードしないと、この処理が実行できないようになっているので要解消
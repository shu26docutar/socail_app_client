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
// Tokenを削除せずにリロードすると、Profileが表示されない原因はバージョンによる影響
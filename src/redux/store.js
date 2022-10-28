import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

// Stateの初期値
const initialState = {}

const middleware = [thunk]

// Stateを更新する裏側の仕組み:Reducerを一つにまとめる
// 値が異なる縮小関数であるオブジェクトを'CreateStore'に渡すことができる単一の縮小関数に変換
// https://japanese-document.github.io/redux/combinereducers.html：公式ドキュメントの翻訳
const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
})

// どのコンポーネントでもアクセスできるように、Storeを作成
const store = createStore(
    reducers, 
    initialState, 
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store
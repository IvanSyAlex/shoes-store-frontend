import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./store/store";
import Wrapper from "./components/Wrapper/Wrapper";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminPanel from "./components/Administrator/AdminPanel/AdminPanel";
import Main from "./components/Main/Main";
import Preview from "./components/Preview/Preview";
import Basket from "./components/Basket/Basket";
import OrderForm from "./components/OrderForm/OrderForm";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <Wrapper>
            <BrowserRouter>
                <Routes>
                    <Route path="/administrator" element={<AdminPanel/>} />
                    <Route path="/" element={<Main />}/>
                    <Route path="/:brandId" element={<Main />}/>
                    <Route path="/preview/:id" element={<Preview />}/>
                    <Route path="/basket/:id" element={<Basket />}/>
                    <Route path="/order-form/" element={<OrderForm />}/>
                </Routes>
            </BrowserRouter>
        </Wrapper>
    </Provider>
);


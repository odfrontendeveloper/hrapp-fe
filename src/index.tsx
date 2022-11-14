import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { getCookie } from 'tools/cookie'
import i18n from './i18n'
import './index.css'
import { RootStoreProvider } from 'store'
import RedirectTo from 'RedirectTo'

const lang = getCookie('lang')
if (lang) i18n.changeLanguage(lang)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <RootStoreProvider>
        <BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <RedirectTo />
            <App />
        </BrowserRouter>
    </RootStoreProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

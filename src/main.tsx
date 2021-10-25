
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from "react-router-config"
import { NavBar } from 'antd-mobile';
import routes from '@/router/index'
import "@/styles/normalize.css"
ReactDOM.render(
  <React.StrictMode>
    <NavBar backArrow={false}>
      <header>
        mental health recommend engine
      </header>
    </NavBar>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

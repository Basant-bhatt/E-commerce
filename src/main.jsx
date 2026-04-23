import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import MyState from './pages/context page/MyState.jsx'
import { Provider } from 'react-redux'
// import { store } from './pages/Redux/srore.jsx'







createRoot(document.getElementById('root')).render(
  
 
  

  <MyState>

  <BrowserRouter>
  {/* <Provider store={store}> */}

    <App />
  {/* </Provider> */}
  </BrowserRouter>
  </MyState>
  
  
    
  
)

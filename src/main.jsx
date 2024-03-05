import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import swDev from './swDev.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
)

swDev()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register();

// function swRegister() {

// if ('serviceWorker' in navigator) {
//   console.log('hi')
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('serviceWorker.js')
//       .then(reg => console.log('Seccess:', reg.scope))
//   })
// }
// }
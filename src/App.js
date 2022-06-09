import './App.css';
import {
  BrowserRouter as Router
} from "react-router-dom"
import Menu from './TP2/Components/Menu';
import Public from './TP2/Routes/Public';
import {Container} from "react-bootstrap"
import AuthProvider from './TP2/Context/AuthProvider';

function App() {
  return (
    <div className='fondo'>
    <Router >
    <AuthProvider>
      <Menu />
      <Container className="fondo2">
        <Public />
      </Container>
      </AuthProvider> 
    </Router>
    </div>
    
  );
}

export default App;
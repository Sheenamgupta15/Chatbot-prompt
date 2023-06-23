import logo from './logo.svg';
import './App.css';
import Chat from './Chat';
import Footer from './components/Footer';

function App() {
  return (

    <div className="App h-screen flex flex-col">
  
      <div className="flex-1"> <Chat></Chat></div>
    </div>
  );
}

export default App;

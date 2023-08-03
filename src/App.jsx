import { GlobalContextProvider } from './Components/GlobalContext';
import Home from './pages/Home';
import './style/main.scss';

function App() {
    return (
        <GlobalContextProvider>
            <Home />
        </GlobalContextProvider>
    );
}

export default App;

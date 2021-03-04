import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import ChatSettings from "./ChatSettings";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Router>
            <Header />
            <div className="app__body">
              <Sidebar />
              <Switch>
                <Route path="/messages/:chatId">
                  <Chat />
                  <ChatSettings />
                </Route>
                <Route path="/">
                  <Chat />
                  <ChatSettings />
                </Route>
              </Switch>
            </div>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;

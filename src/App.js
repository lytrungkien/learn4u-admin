import './App.css';
import 'antd/dist/antd.css';
import Homepage from './components/Home';
import AdminAccount from './components/AdminAccount/index';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import ManageUser from './components/ManageUser';
import Vocab from './components/Vocab';
import Grammar from './components/Grammar';
import Conversation from './components/Conversation';
import Login from './components/Login/Login';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<ManageUser />
				</Route>
				<Route path="/manage-vocab">
					<Vocab />
				</Route>
				<Route path="/manage-grammar">
					<Grammar />
				</Route>
				<Route path="/manage-conversation">
					<Conversation />
				</Route>
				<Route path="/admin-account">
					<AdminAccount />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;

import './App.css';
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
			</Switch>
		</Router>
	);
}

export default App;

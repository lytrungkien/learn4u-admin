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
import VocabLessonDetail from './components/Vocab/VocabLessonDetail/VocabLessonDetail';
import AddVocab from './components/Vocab/AddVocab/AddVocab';
import EditVocab from './components/Vocab/EditVocab/EditVocab';
import GrammarLessonDetail from './components/Grammar/GrammarLesson/GrammarDetail';
import AddGrammar from './components/Grammar/GrammarLesson/AddGrammarLesson';
import EditGrammarLesson from './components/Grammar/GrammarLesson/EditGrammarLesson';
import TestDetail from './components/Grammar/GrammarTest/GrammarTestDetail';
import AddGrammarTest from './components/Grammar/GrammarTest/AddGrammarTest';
import EditGrammarTest from './components/Grammar/GrammarTest/EditGrammarTest';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<ManageUser />
				</Route>
				<Route exact path="/manage-vocab">
					<Vocab />
				</Route>
				<Route exact path="/manage-grammar">
					<Grammar />
				</Route>
				<Route exact path="/manage-grammar/lesson/:id">
					<GrammarLessonDetail />
				</Route>
				<Route path="/manage-grammar/lesson/:id/add-lesson">
					<AddGrammar />
				</Route>
				<Route path="/manage-grammar/lesson/:id/edit-lesson">
					<EditGrammarLesson />
				</Route>
				<Route exact path="/manage-grammar/test/:id">
					<TestDetail />
				</Route>
				<Route exact path="/manage-grammar/test/:id/add-sentence">
					<AddGrammarTest />
				</Route>
				<Route exact path="/manage-grammar/test/:id/edit-sentence">
					<EditGrammarTest />
				</Route>
				<Route exact path="/manage-conversation">
					<Conversation />
				</Route>
				<Route path="/admin-account">
					<AdminAccount />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route exact path="/manage-vocab/:id">
					<VocabLessonDetail />
				</Route>
				<Route path="/manage-vocab/:id/add-vocab">
					<AddVocab />
				</Route>
				<Route path="/manage-vocab/:id/edit-vocab">
					<EditVocab />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;

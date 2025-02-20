import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import { TodoList } from '../components/to-do-list';

function Main() {
  return (
    <div>
      <TodoList/>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import ExpenseForm from "./components/ExpenseForm.tsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExpenseForm />} />
      </Routes>
    </Router>
  );
}

export default App

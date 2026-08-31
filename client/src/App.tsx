import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="mx-auto w-full max-w-6xl p-4 md:p-8">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/library" element={<Dashboard />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
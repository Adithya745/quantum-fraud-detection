import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dataset from './pages/Dataset';
import ClassicalModels from './pages/ClassicalModels';
import QuantumClassifier from './pages/QuantumClassifier';
import Comparison from './pages/Comparison';
import Insights from './pages/Insights';
import RealTimeFraudDetection from './pages/RealTimeFraudDetection';
import '@/index.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dataset" element={<Dataset />} />
          <Route path="/classical" element={<ClassicalModels />} />
          <Route path="/quantum" element={<QuantumClassifier />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/real-time" element={<RealTimeFraudDetection />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

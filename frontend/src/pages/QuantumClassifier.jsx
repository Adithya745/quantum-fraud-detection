import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Atom, Cpu, Network } from 'lucide-react';

const QuantumClassifier = () => {
  const metrics = {
    accuracy: 0.915,
    precision: 0.932,
    recall: 0.895,
    f1: 0.913
  };

  const confusionMatrix = [
    { actual: 'Legitimate', predicted: 'Legitimate', value: 92, color: 'bg-blue-900/50 text-blue-100' },
    { actual: 'Legitimate', predicted: 'Fraud', value: 8, color: 'bg-red-900/20 text-red-200' },
    { actual: 'Fraud', predicted: 'Legitimate', value: 11, color: 'bg-red-900/20 text-red-200' },
    { actual: 'Fraud', predicted: 'Fraud', value: 89, color: 'bg-blue-900/50 text-blue-100' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Atom className="h-8 w-8 text-primary animate-spin-slow" />
          Quantum Fraud Classifier
        </h2>
        <p className="text-muted-foreground mt-2">
          Variational Quantum Classifier (VQC) implementation using Qiskit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Circuit Details */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Circuit Architecture</CardTitle>
            <CardDescription>Quantum Kernel & Feature Map</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm text-muted-foreground">Feature Map</span>
                <Badge variant="secondary">ZZFeatureMap</Badge>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm text-muted-foreground">Qubits</span>
                <span className="font-mono font-bold">8</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm text-muted-foreground">Entanglement</span>
                <span className="font-medium">Linear</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm text-muted-foreground">Circuit Depth</span>
                <span className="font-mono">~12</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm text-muted-foreground">Optimizer</span>
                <span className="font-medium">COBYLA</span>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg border border-border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Network className="h-4 w-4" /> How it works
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Classical data is mapped into a high-dimensional Hilbert space using the ZZFeatureMap. 
                A parameterized quantum circuit (Ansatz) then processes this state, and measurement results 
                are mapped to class labels.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Performance & Confusion Matrix */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(metrics).map(([key, value]) => (
                  <div key={key} className="flex flex-col p-4 bg-muted/20 rounded-lg border border-border">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{key}</span>
                    <span className="text-2xl font-bold text-primary">{(value * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Confusion Matrix</CardTitle>
              <CardDescription>Predicted vs Actual Classifications (Test Set Sample)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
                {/* Headers */}
                <div className="col-span-2 flex justify-between px-2 text-xs text-muted-foreground mb-1">
                  <span>Predicted: Legitimate</span>
                  <span>Predicted: Fraud</span>
                </div>
                
                {confusionMatrix.map((cell, i) => (
                  <div 
                    key={i} 
                    className={`h-24 flex flex-col items-center justify-center rounded-lg border border-border/50 ${cell.color}`}
                  >
                    <span className="text-3xl font-bold">{cell.value}</span>
                    <span className="text-xs opacity-70">Actual: {cell.actual}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuantumClassifier;

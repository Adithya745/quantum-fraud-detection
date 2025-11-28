import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Badge } from '@/components/ui/badge';

const ClassicalModels = () => {
  const results = [
    { model: "Logistic Regression", accuracy: 0.942, precision: 0.965, recall: 0.918, f1: 0.941 },
    { model: "Random Forest", accuracy: 0.991, precision: 0.989, recall: 0.993, f1: 0.991 },
    { model: "XGBoost", accuracy: 0.993, precision: 0.991, recall: 0.995, f1: 0.993 },
  ];

  const rocData = Array.from({ length: 20 }, (_, i) => {
    const x = i / 19;
    return {
      fpr: x,
      lr: Math.min(1, x * 1.5 + 0.1), // Mock curves
      rf: Math.min(1, x * 4 + 0.05),
      xgb: Math.min(1, x * 5 + 0.02),
    };
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Classical ML Models</h2>
        <p className="text-muted-foreground mt-2">
          Performance benchmarks of traditional machine learning algorithms on the balanced dataset.
        </p>
      </div>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Model Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model Name</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Precision</TableHead>
                <TableHead>Recall</TableHead>
                <TableHead>F1-Score</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((row) => (
                <TableRow key={row.model}>
                  <TableCell className="font-medium">{row.model}</TableCell>
                  <TableCell>{(row.accuracy * 100).toFixed(1)}%</TableCell>
                  <TableCell>{(row.precision * 100).toFixed(1)}%</TableCell>
                  <TableCell>{(row.recall * 100).toFixed(1)}%</TableCell>
                  <TableCell>{(row.f1 * 100).toFixed(1)}%</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Converged
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Metric Comparison</CardTitle>
            <CardDescription>Accuracy vs F1-Score across models</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="model" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[0.8, 1]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                />
                <Legend />
                <Bar dataKey="accuracy" name="Accuracy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="f1" name="F1-Score" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ROC Curves */}
        <Card>
          <CardHeader>
            <CardTitle>ROC Curves</CardTitle>
            <CardDescription>Receiver Operating Characteristic</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rocData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="fpr" type="number" domain={[0, 1]} label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis domain={[0, 1]} label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                <Legend />
                <Line type="monotone" dataKey="lr" name="Logistic Reg" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="rf" name="Random Forest" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="xgb" name="XGBoost" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClassicalModels;

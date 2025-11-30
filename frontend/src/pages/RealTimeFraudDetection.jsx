import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  RefreshCw, 
  Zap, 
  History, 
  Download, 
  AlertCircle,
  Coffee,
  ShoppingCart,
  Moon,
  Plane,
  HelpCircle
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const RealTimeFraudDetection = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    time: 12,
    merchant: 'Grocery',
    location: 'Home City',
    type: 'Credit',
    device: 'Mobile',
    daysSince: 0,
    transactionsToday: 0
  });

  const [result, setResult] = useState(null);

  const merchantCategories = ['Grocery', 'Gas Station', 'Restaurant', 'Online', 'ATM', 'Travel', 'Shopping', 'Entertainment'];
  const locations = ['Home City', 'Nearby City', 'Different State', 'Abroad', 'High Risk Area'];
  const transactionTypes = ['Credit', 'Debit', 'Transfer'];
  const deviceTypes = ['Mobile', 'Web', 'ATM', 'In-Person'];

  // Fetch history on load
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API}/history`);
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to fetch history", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  const quickTest = (scenario) => {
    let newData = { ...formData };
    switch(scenario) {
      case 'coffee':
        newData = { ...newData, amount: 5, time: 10, merchant: 'Grocery', location: 'Home City' };
        break;
      case 'online':
        newData = { ...newData, amount: 100, time: 19, merchant: 'Online', location: 'Home City' };
        break;
      case 'atm':
        newData = { ...newData, amount: 500, time: 3, merchant: 'ATM', location: 'Different State' };
        break;
      case 'suspicious':
        newData = { ...newData, amount: 5000, time: 2, merchant: 'Travel', location: 'Abroad' };
        break;
      case 'moderate':
        newData = { ...newData, amount: 200, time: 14, merchant: 'Shopping', location: 'Nearby City' };
        break;
      default:
        break;
    }
    setFormData(newData);
    // Auto predict after a short delay
    setTimeout(() => predictFraud(newData), 100);
  };

  const predictFraud = async (dataToPredict = formData) => {
    if (!dataToPredict.amount || dataToPredict.amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Call FastAPI Backend
      const payload = {
        amount: parseFloat(dataToPredict.amount),
        time: parseInt(dataToPredict.time),
        merchant: dataToPredict.merchant,
        location: dataToPredict.location,
        type: dataToPredict.type,
        device: dataToPredict.device,
        daysSince: parseInt(dataToPredict.daysSince),
        transactionsToday: parseInt(dataToPredict.transactionsToday)
      };

      const response = await axios.post(`${API}/predict`, payload);
      setResult(response.data);
      
      // Refresh history
      fetchHistory();

    } catch (error) {
      console.error("Prediction failed", error);
      alert("Failed to get prediction from server");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      amount: '',
      time: 12,
      merchant: 'Grocery',
      location: 'Home City',
      type: 'Credit',
      device: 'Mobile',
      daysSince: 0,
      transactionsToday: 0
    });
    setResult(null);
  };

  const downloadHistory = () => {
    const headers = ["Date", "Amount", "Merchant", "Location", "Status", "Risk Score"];
    const csvContent = [
      headers.join(","),
      ...history.map(row => [
        new Date(row.timestamp).toLocaleString(), 
        row.amount, 
        row.merchant, 
        row.location, 
        row.status, 
        row.riskScore
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "fraud_prediction_history.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Zap className="h-8 w-8 text-yellow-500" />
          Real-Time Fraud Detection
        </h2>
        <p className="text-muted-foreground mt-2">
          Live prediction engine powered by FastAPI & MongoDB.
        </p>
      </div>

      {/* Quick Test Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Button variant="outline" className="h-auto py-3 flex flex-col gap-1 hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/50" onClick={() => quickTest('coffee')}>
          <Coffee className="h-5 w-5 mb-1" />
          <span className="text-xs font-semibold">Coffee Run</span>
          <span className="text-[10px] text-muted-foreground">Low Risk</span>
        </Button>
        <Button variant="outline" className="h-auto py-3 flex flex-col gap-1 hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/50" onClick={() => quickTest('online')}>
          <ShoppingCart className="h-5 w-5 mb-1" />
          <span className="text-xs font-semibold">Online Shop</span>
          <span className="text-[10px] text-muted-foreground">Low Risk</span>
        </Button>
        <Button variant="outline" className="h-auto py-3 flex flex-col gap-1 hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/50" onClick={() => quickTest('moderate')}>
          <HelpCircle className="h-5 w-5 mb-1" />
          <span className="text-xs font-semibold">Moderate</span>
          <span className="text-[10px] text-muted-foreground">Medium Risk</span>
        </Button>
        <Button variant="outline" className="h-auto py-3 flex flex-col gap-1 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50" onClick={() => quickTest('atm')}>
          <Moon className="h-5 w-5 mb-1" />
          <span className="text-xs font-semibold">Late ATM</span>
          <span className="text-[10px] text-muted-foreground">High Risk</span>
        </Button>
        <Button variant="outline" className="h-auto py-3 flex flex-col gap-1 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50" onClick={() => quickTest('suspicious')}>
          <Plane className="h-5 w-5 mb-1" />
          <span className="text-xs font-semibold">Suspicious</span>
          <span className="text-[10px] text-muted-foreground">Very High Risk</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Input Form */}
        <Card className="lg:col-span-1 border-primary/20 shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>Enter parameters to analyze</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Amount ($)</Label>
              <Input 
                type="number" 
                name="amount" 
                placeholder="0.00" 
                value={formData.amount} 
                onChange={handleInputChange}
                className="text-lg font-mono"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Time of Day (24h)</Label>
                <span className="text-xs text-muted-foreground font-mono">{formData.time}:00</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="23" 
                value={formData.time} 
                onChange={(e) => handleSliderChange('time', e.target.value)}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Merchant</Label>
                <select 
                  name="merchant" 
                  value={formData.merchant} 
                  onChange={handleInputChange}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {merchantCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <select 
                  name="location" 
                  value={formData.location} 
                  onChange={handleInputChange}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {locations.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleInputChange}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {transactionTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Device</Label>
                <select 
                  name="device" 
                  value={formData.device} 
                  onChange={handleInputChange}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deviceTypes.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Days Since Last Tx</Label>
                <span className="text-xs text-muted-foreground font-mono">{formData.daysSince} days</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="365" 
                value={formData.daysSince} 
                onChange={(e) => handleSliderChange('daysSince', e.target.value)}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" 
              size="lg"
              onClick={() => predictFraud()}
              disabled={loading}
            >
              {loading ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Zap className="mr-2 h-4 w-4" />
              )}
              {loading ? "Analyzing..." : "Predict Fraud"}
            </Button>
            <Button variant="outline" onClick={clearForm}>Clear</Button>
          </CardFooter>
        </Card>

        {/* Right Column: Results */}
        <div className="lg:col-span-2 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Main Result Card */}
              <Card className={`border-2 ${result.isFraud ? 'border-destructive bg-destructive/5' : (result.riskScore > 30 ? 'border-yellow-500 bg-yellow-500/5' : 'border-green-500 bg-green-500/5')}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className={`text-3xl font-bold ${result.isFraud ? 'text-destructive' : (result.riskScore > 30 ? 'text-yellow-500' : 'text-green-500')}`}>
                        {result.status}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Transaction analysis complete
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      Risk Score: {result.riskScore}/100
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Risk Probability</span>
                      <span className="font-bold">{result.riskScore}%</span>
                    </div>
                    <Progress 
                      value={result.riskScore} 
                      className="h-3" 
                      indicatorColor={result.isFraud ? 'bg-destructive' : (result.riskScore > 30 ? 'bg-yellow-500' : 'bg-green-500')}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div className="p-3 bg-background/50 rounded-lg border border-border">
                      <div className="text-xs text-muted-foreground">Classical Confidence</div>
                      <div className="text-xl font-bold">{result.classicalConf}%</div>
                    </div>
                    <div className="p-3 bg-background/50 rounded-lg border border-border">
                      <div className="text-xs text-muted-foreground">Quantum Confidence</div>
                      <div className="text-xl font-bold text-primary">{result.quantumConf}%</div>
                    </div>
                    <div className="p-3 bg-background/50 rounded-lg border border-border">
                      <div className="text-xs text-muted-foreground">Model Agreement</div>
                      <div className="text-sm font-bold mt-1">{result.agreement}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Explanation Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    Why this prediction?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Contributing Factors:</h4>
                      <ul className="space-y-1">
                        {result.reasons.map((reason, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className={`h-1.5 w-1.5 rounded-full ${result.isFraud ? 'bg-destructive' : 'bg-green-500'}`} />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-md text-sm border border-border">
                      <strong>Tip:</strong> {result.isFraud 
                        ? "This transaction has been flagged for manual review. Do not approve until verified." 
                        : "This transaction matches normal user behavior patterns."}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-border rounded-xl bg-muted/10">
              <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Ready to Analyze</h3>
              <p className="text-muted-foreground max-w-sm mt-2">
                Fill out the form or use a Quick Test button to simulate a transaction prediction.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* History Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <CardTitle>Prediction History (MongoDB)</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={downloadHistory} className="gap-2">
            <Download className="h-4 w-4" />
            Download CSV
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Prediction</TableHead>
                <TableHead>Risk Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-xs">
                    {new Date(row.timestamp).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>${row.amount}</TableCell>
                  <TableCell>{row.merchant}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      row.isFraud 
                        ? "bg-destructive/10 text-destructive border-destructive/20" 
                        : (row.riskScore > 30 ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : "bg-green-500/10 text-green-500 border-green-500/20")
                    }>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={row.riskScore} className="w-16 h-2" indicatorColor={row.isFraud ? 'bg-destructive' : 'bg-green-500'} />
                      <span className="text-xs font-medium">{row.riskScore}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeFraudDetection;

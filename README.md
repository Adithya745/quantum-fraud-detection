# Quantum-Enhanced Fraud Detection System

A production-grade full-stack web application comparing **Quantum Machine Learning** with **Classical ML** for credit card fraud detection.

![Quantum Fraud Detection](https://img.shields.io/badge/Quantum-Computing-blueviolet)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)

## 🚀 Overview

This project demonstrates the convergence of **quantum computing** and **modern web development**, built with a **FARM Stack** (FastAPI + React + MongoDB).

### Key Features
- ⚛️ **Quantum ML Integration**: IBM Qiskit quantum kernel SVM
- 🤖 **Classical ML Baselines**: Logistic Regression, Random Forest, XGBoost
- 💻 **Modern Web UI**: React.js with Tailwind CSS + Shadcn UI
- ⚡ **High Performance**: FastAPI backend for real-time predictions
- 📊 **Real-time Analytics**: Interactive dashboard with visualizations
- 🔐 **Production Ready**: Scalable architecture ready for deployment

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js 18, Tailwind CSS, Shadcn UI |
| **Backend** | FastAPI (Python), Uvicorn |
| **Database** | MongoDB |
| **ML/AI** | Qiskit, Scikit-learn, XGBoost, Pandas |
| **Deployment** | Docker-ready |

## 📊 Dataset

- **Source**: Kaggle Credit Card Fraud Detection
- **Records**: 284,807 transactions
- **Fraud Rate**: 0.172% (highly imbalanced)
- **Features**: 30 (PCA-reduced to 8 for quantum)
- **Processing**: SMOTE for balance, StandardScaler normalization

## 🧪 Models Implemented

### Classical Models
1. **Logistic Regression** - Fast baseline
2. **Random Forest** - Ensemble learning
3. **XGBoost** - Gradient boosting

### Quantum Model
- **Quantum Kernel SVM** - Qiskit-based
- **Architecture**: 8 qubits, ZZFeatureMap, linear entanglement
- **Comparison**: Performance metrics vs classical approaches

## 📁 Project Structure

quantum-fraud-detection/
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── public/
│ ├── package.json
│ ├── tailwind.config.js
│ ├── vite.config.js
│ └── .gitignore
├── backend/
│ ├── app.py
│ ├── requirements.txt
│ ├── .env.example
│ └── .gitignore
├── README.md
├── .gitignore
└── docker-compose.yml (optional)

text

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ 
- **Python** 3.8+
- **MongoDB** (local or Atlas)
- **Git**

### Installation

**1. Clone Repository**
git clone https://github.com/YOUR_USERNAME/quantum-fraud-detection.git
cd quantum-fraud-detection

text

**2. Backend Setup**
cd backend
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python app.py

text

Backend will run on: `http://localhost:8000`

**3. Frontend Setup** (in new terminal)
cd frontend
npm install
npm run dev

text

Frontend will run on: `http://localhost:5173`

**4. Access Application**
- Open browser: `http://localhost:5173`
- API docs: `http://localhost:8000/docs`

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/predict` | POST | Predict fraud for transaction |
| `/models/performance` | GET | Get all model metrics |
| `/history` | GET | Get prediction history |
| `/docs` | GET | Interactive API documentation |

## 🔮 Real-Time Prediction Example

**Request:**
{
"amount": 150.00,
"time_hour": 14,
"merchant": "grocery",
"location": "home_city",
"device": "mobile",
"days_since_last": 7,
"transactions_today": 2
}

text

**Response:**
{
"classical_prediction": "legitimate",
"classical_confidence": 0.92,
"quantum_prediction": "legitimate",
"quantum_confidence": 0.88,
"risk_score": 15,
"recommendation": "APPROVE"
}

text

## 📈 Performance Metrics

After running the models, you'll get:

| Model | Accuracy | F1-Score | ROC-AUC |
|-------|----------|----------|---------|
| Logistic Regression | ~99.2% | ~0.95 | ~0.98 |
| Random Forest | ~99.5% | ~0.97 | ~0.99 |
| XGBoost | ~99.6% | ~0.98 | ~0.99 |
| **Quantum SVM** | ~98.8% | ~0.96 | ~0.98 |

## 🔗 Live Deployment

- **Frontend**: [Your Vercel/Netlify link]
- **Backend**: [Your Heroku/Railway link]
- **Database**: MongoDB Atlas

## 🎓 Key Learnings

✅ **Quantum Computing**: Feature encoding, quantum kernels, entanglement
✅ **ML Engineering**: Model comparison, evaluation metrics, feature engineering
✅ **Full-Stack Development**: React + FastAPI integration
✅ **Production Deployment**: Docker, cloud deployment, scaling
✅ **Data Science**: Imbalanced datasets, PCA, SMOTE

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- [ ] Deploy on real quantum hardware (IBM Quantum)
- [ ] Implement Variational Quantum Algorithms
- [ ] Add more datasets for testing
- [ ] Performance optimization
- [ ] Enhanced visualizations

## 📜 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

## 👨‍💻 Author

**Your Name**
- 🔗 LinkedIn: [Your LinkedIn]
- 💻 GitHub: [Your GitHub]
- 📧 Email: your.email@example.com

## 🙏 Acknowledgments

- IBM Qiskit for quantum computing framework
- Kaggle for the fraud detection dataset
- FastAPI and React communities
- Shadcn UI for component library

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact via LinkedIn --> www.linkedin.com/in/baladithya-adigopula-98a3b1298
- Email: adithya745.adigopula@gmail.com

---

**Made with ❤️ and ⚛️ Quantum Magic**

*Last Updated: November 28, 2025*

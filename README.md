# 🌾 OptiCrop - Smart Agricultural Production Optimization Engine

## Project Overview

**OptiCrop** is a production-ready agriculture recommendation platform that integrates a trained machine learning crop model with a modern React frontend. It predicts the most suitable crop based on user-provided environmental conditions and soil characteristics.

## Architecture

- `backend/` - Flask API and model prediction logic
- `backend/model/` - Trained machine learning model file
- `dataset/` - Original crop dataset used during model training
- `frontend/` - Official React frontend UI provided for the application
- `requirements.txt` - Python dependencies for backend
- `README.md` - Project documentation

## Folder Structure

```text
OptiCrop-Smart-Agriculture-main/
├── backend/
│   ├── api.py
│   ├── prediction.py
│   ├── __init__.py
│   └── model/
│       └── crop_model.pkl
├── dataset/
│   └── crop_data.csv
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── public/
│   └── src/
├── requirements.txt
└── README.md
```

## Installation

### Python Backend

1. Navigate to the project root:

```bash
cd OptiCrop-Smart-Agriculture-main
```

2. Install backend dependencies:

```bash
python -m pip install -r requirements.txt
```

### React Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install frontend dependencies:

```bash
npm install
```

> If Node.js/npm is not installed, please install them first from https://nodejs.org/

## Backend Setup

Run the Flask backend from the project root:

```bash
python -m backend.api
```

Or alternatively:

```bash
python backend/app.py
```

This starts the API at `http://localhost:5000`.

## Frontend Setup

Run the React frontend from the `frontend` directory:

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal.

## API Documentation

### Health Check

- `GET /health`
- Response: `{"status": "ok"}`

### Crop Prediction

- `POST /predict`
- JSON body:
  - `temperature`: number
  - `rainfall`: number
  - `humidity`: number
  - `soil`: string
  - `ph`: number
- Response:
  - `crop`: string
  - `confidence`: number

Example request body:

```json
{
  "temperature": 28,
  "rainfall": 150,
  "humidity": 80,
  "soil": "Loamy",
  "ph": 6.5
}
```

## Prediction Flow

1. User enters environmental and soil inputs in the frontend UI.
2. Frontend sends the request to `POST /predict`.
3. Backend validates the inputs.
4. Backend loads the trained `crop_model.pkl` from `backend/model/`.
5. The model predicts the recommended crop.
6. Frontend displays the crop recommendation, confidence score, and cultivation guidance.

## Technology Stack

- Python
- Flask
- Pandas
- NumPy
- Scikit-learn
- React
- Vite
- TypeScript
- Tailwind CSS

## Deployment

### Backend

- Use `python -m backend.api` for development.
- For production, deploy with a WSGI server such as Gunicorn or Render.

### Frontend

- Use `npm run build` to create a production-ready bundle.
- Serve static assets with any static hosting service or integrate with backend hosting.

## Notes

- The ML model is pre-trained and loaded from `backend/model/crop_model.pkl`.
- The frontend uses the official provided UI and is connected directly to the backend.
- The backend uses robust input validation and returns JSON responses.

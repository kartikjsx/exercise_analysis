from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import joblib
import pandas as pd


# ============================================================
# 1. CREATE FASTAPI APP
# ============================================================

app = FastAPI(
    title="Calories Burned Simulator API",
    version="1.0.0"
)


# ============================================================
# 2. CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


# ============================================================
# 3. LOAD MODEL ONCE
# ============================================================

MODEL_PATH = "models/calories_burned_model.joblib"

try:
    model = joblib.load(MODEL_PATH)
    print("✅ Calories model loaded successfully.")

except Exception as error:
    model = None
    print("❌ Failed to load model:")
    print(error)


# ============================================================
# 4. EXPECTED FEATURES
# ============================================================

EXPECTED_FEATURES = [
    "Age",
    "Gender",
    "Weight (kg)",
    "Height (m)",
    "Max_BPM",
    "Avg_BPM",
    "Resting_BPM",
    "Session_Duration (hours)",
    "Fat_Percentage",
    "Water_Intake (liters)",
    "Workout_Frequency (days/week)",
    "Experience_Level",
    "BMI",
    "Workout_Type"
]


# ============================================================
# 5. HOME / HEALTH CHECK
# ============================================================

@app.get("/")
def home():

    return {
        "status": "online",
        "message": "Calories Burned Simulator API is running"
    }


# ============================================================
# 6. PREDICTION ENDPOINT
# ============================================================

@app.post("/predict")
def predict(data: dict):

    # --------------------------------------------------------
    # Make sure model loaded
    # --------------------------------------------------------

    if model is None:

        raise HTTPException(
            status_code=500,
            detail="ML model could not be loaded."
        )


    # --------------------------------------------------------
    # Check for missing features
    # --------------------------------------------------------

    missing_features = [
        feature
        for feature in EXPECTED_FEATURES
        if feature not in data
    ]

    if missing_features:

        raise HTTPException(
            status_code=400,
            detail={
                "message": "Missing input features.",
                "missing_features": missing_features
            }
        )


    # --------------------------------------------------------
    # Ignore unexpected fields
    # --------------------------------------------------------

    input_data = {
        feature: data[feature]
        for feature in EXPECTED_FEATURES
    }


    # --------------------------------------------------------
    # Convert to DataFrame
    # --------------------------------------------------------

    try:

        input_df = pd.DataFrame(
            [input_data]
        )

    except Exception as error:

        raise HTTPException(
            status_code=400,
            detail=f"Invalid input data: {error}"
        )


    # --------------------------------------------------------
    # Prediction
    # --------------------------------------------------------

    try:

        prediction = model.predict(
            input_df
        )[0]

    except Exception as error:

        raise HTTPException(
            status_code=400,
            detail=f"Prediction failed: {error}"
        )


    # --------------------------------------------------------
    # Return result
    # --------------------------------------------------------

    return {
        "calories_burned": round(
            float(prediction),
            2
        )
    }
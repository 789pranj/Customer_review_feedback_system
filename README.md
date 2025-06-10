# 🧠 Customer Review Feedback System

## YouTube Video demo link
https://www.youtube.com/watch?v=d6Qpg6KgJGw

---

This is an AI-powered Customer Feedback Review System that analyzes customer service conversations using NLP. It provides intent detection, sentiment analysis, call quality scoring, feedback generation, and more.

---

## 🚀 Tech Stack

### 💻 Frontend (Vite + React + TailwindCSS)
- TailwindCSS
- React 19
- React Router DOM
- Zustand (state management)
- Axios
- Lucide Icons

### 🔧 Backend (MERN + FastAPI)
- FastAPI (for ML API)
- Express.js (Node backend)
- MongoDB (Database)
- Python ML models for:
  - Intent classification
  - Sentiment analysis
  - Summarization
  - Feedback generation

---

## 🧩 Features

- ✅ Intent Detection(Tagging) with custom fine-tuned BERT model + Logistic Regression Model (high accuracy, Precision)
- ✅ Sentiment Analysis using `cardiffnlp/twitter-roberta-base-sentiment`
- ✅ Summarization using `google/flan-t5-large`
- ✅ Call Quality Score based on keywords, politeness, and sentiment
- ✅ NLP-based Section Tagging (e.g., Greeting, Complaint, Resolution)
- ✅ Real-time feedback generation for customer transcripts
- ✅ CORS-enabled FastAPI with structured response

---

## 🐍 Python Backend Setup (FastAPI + Transformers)
---
## ⚙️ Installation & Running Guide (All Services)

Follow these steps to run the **ML API**, **Backend**, and **Frontend** in parallel:

---

### 🔁 1. Clone the Repository

```bash
git clone https://github.com/your-username/customer-feedback-system.git
cd customer-feedback-system
```

ML model
## Due to very large size of model we are unable to upload it right now but we will be uploading it very soon as we tackle this problem.
```
cd fastapi_server
pip install fastapi uvicorn transformers torch pandas
uvicorn app:app --reload
```
Backend

```
cd ../backend
npm install
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
npm run dev
```
frontend

```
cd ../frontend
npm install
npm run dev
```

### Sample Screen Shots

![Screenshot 1](https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749571265/WhatsApp_Image_2025-06-10_at_5.33.19_PM_pbl29z.jpg)

![Screenshot 2](https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749571265/WhatsApp_Image_2025-06-10_at_5.30.46_PM_tvswq0.jpg)

![Screenshot 3](https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749571266/WhatsApp_Image_2025-06-10_at_5.31.08_PM_i72dvs.jpg)

![Screenshot 4](https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749571265/WhatsApp_Image_2025-06-10_at_5.32.04_PM_gtwld1.jpg)

![Screenshot 5](https://res.cloudinary.com/duxeqhtxe/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749571265/WhatsApp_Image_2025-06-10_at_5.32.25_PM_h0fpna.jpg)


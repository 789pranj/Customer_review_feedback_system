import React, { useState } from 'react';

const AudioUpload = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [message, setMessage] = useState('');
  const [transcript, setTranscript] = useState('');
  const [predictedData, setPredictedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
    setMessage('');
    setTranscript('');
    setPredictedData(null);
  };

  const handleUpload = async () => {
    if (!audioFile) {
      alert('Please select an audio file first');
      return;
    }

    const formData = new FormData();
    formData.append('audio', audioFile);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setTranscript(data.text);
        setMessage('✅ Audio uploaded and transcribed successfully!');
      } else {
        setMessage('❌ Upload or transcription failed.');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Error uploading audio.');
    }
    setLoading(false);
  };

  const handlePredictClick = async () => {
    if (!transcript) {
      alert("Transcript is empty. Upload an audio file first.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/analyze/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: transcript })
      });

      const data = await response.json();
      setPredictedData(data);
    } catch (error) {
      console.error("Prediction error:", error);
      setPredictedData(null);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 bg-gradient-to-br from-sky-100 to-indigo-200">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-green-700 mb-1 drop-shadow-sm tracking-wide">
        Codeiter
      </h1>

      {/* Tagline */}
      <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 mb-10">
        Upload audio and get instant transcription with analysis!
      </p>

      {/* Upload Card */}
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">Upload Audio File</h2>

        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-green-500 
            file:mr-4 file:py-2 file:px-4 
            file:rounded-md file:border-0 
            file:text-sm file:font-semibold 
            file:bg-indigo-50 file:text-gray-700 
            hover:file:bg-indigo-100 mb-6 cursor-pointer"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300 disabled:opacity-50 cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Upload & Convert to Text'}
        </button>

        {message && (
          <p className={`mt-5 text-center text-lg font-medium ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        {transcript && (
          <div className="mt-8 p-5 bg-gray-50 border border-indigo-200 rounded-lg">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">📝 Transcript:</h3>
            <p className="text-gray-800 whitespace-pre-line">{transcript}</p>
          </div>
        )}
      </div>

      {/* Predict Button */}
      {transcript && (
        <div className="mt-6 w-full max-w-2xl text-center">
          <button
            onClick={handlePredictClick}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300 shadow-md disabled:opacity-50 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Prediction"}
          </button>
        </div>
      )}

      {/* Prediction Output */}
      {predictedData && (
        <div className="w-full max-w-2xl mt-10 bg-white p-6 rounded-xl shadow-md text-gray-800 text-lg space-y-3">
          <h2 className="font-semibold text-2xl text-green-600 mb-2">📊 Analysis Result</h2>

          <p><strong>🧠 Intent:</strong> {predictedData.intent} <span className="text-sm text-gray-500">({(predictedData.confidence * 100).toFixed(2)}% confidence)</span></p>

          <p><strong>😃 Sentiment:</strong> {predictedData.sentiment}</p>

          <p><strong>📋 Summary:</strong> {predictedData.summary}</p>

          <p><strong>🏷️ Sections:</strong> {predictedData.sections.join(", ")}</p>

          <p><strong>📊 Quality Score:</strong> {predictedData.quality_score}/100</p>

          <p><strong>🧾 Feedback:</strong> {predictedData.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default AudioUpload;

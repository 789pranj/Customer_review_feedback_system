import { useState, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';

const LiveAudio = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [predictedData, setPredictedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);

  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + event.results[i][0].transcript + ' ');
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event);
        setListening(false);
      };
    }

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      setTranscript('');
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const handlePredictClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/analyze/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcript }),
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
        Call Intelligence via NLP
      </h1>

      {/* Tagline */}
      <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 mb-10">
        Speak and receive real-time transcription with smart predictions!
      </p>

      {/* Mic Section */}
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg text-center mb-8">
        <h2 className="text-2xl font-semibold text-green-600 mb-6">Live Audio Input</h2>

        <button
          onClick={handleMicClick}
          className={`w-16 h-16 flex items-center justify-center rounded-full text-white mx-auto mb-5 transition-all duration-300 shadow-md cursor-pointer ${
            listening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {listening ? <MicOff size={28} /> : <Mic size={28} />}
        </button>

        {/* Transcript Box */}
        <div className="mt-6 p-5 bg-gray-50 border border-indigo-200 rounded-lg min-h-[100px] text-left">
          <h3 className="text-xl font-semibold text-indigo-700 mb-3">📝 Transcript:</h3>
          <p className="text-gray-800 whitespace-pre-line">
            {transcript || (listening ? '🎙️ Listening...' : 'Click the mic to start speaking')}
          </p>
        </div>
      </div>

      {/* Predict Button */}
      {transcript && (
        <div className="mt-2 w-full max-w-2xl text-center">
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

export default LiveAudio;

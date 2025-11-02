import { db } from "./services/firebase";

function App() {
  console.log("Firestore terhubung:", db); // Tes koneksi Firebase

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-gray-50">
      <div className="text-4xl font-bold text-blue-600">
        Tailwind Sudah Aktif 🎉
      </div>

      <div className="text-2xl font-semibold text-green-600">
        Firebase Sudah Terhubung 🔥
      </div>
    </div>
  );
}

export default App;

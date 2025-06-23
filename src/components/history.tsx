import { useEffect, useState } from "react";
import getHistory from "../services/history.services";
import { Link } from "react-router";
interface HistoryItem {
  _id: string;
  user: string;
  weather: string;
  lat: number;
  lon: number;
  requestedAt: string;
}

const History = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory({
          limit: 10,
          skip: 0,
          sort: "-requestedAt",
        });
        setHistory(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch history");
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-6 bg-sky-50 min-h-screen">
      <div className=" text-right">
        <Link className="text-3xl font-bold text-gray-700" to="/">
          Home
        </Link>
      </div>
      <h1 className="text-2xl mb-4 font-semibold">Search History</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="bg-white shadow-md rounded p-4 space-y-4">
        {history.map((item) => (
          <li key={item._id} className="border-b pb-2">
            <p>
              <strong>Lat:</strong> {item.lat}, <strong>Lon:</strong> {item.lon}
            </p>
            <p>
              <strong>Requested At:</strong>
              {new Date(item.requestedAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;

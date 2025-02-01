import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Complaint {
  complaintId: number;
  userName: string;
  reportedUserName: string;
  complaintText: string;
  createdAt: string;
}

export const AdminPage = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Получение незавершенных жалоб
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7268/api/admin/unresolved-complaints",
        );
        setComplaints(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Ошибка загрузки жалоб. Попробуйте позже.");
      }
    };

    fetchComplaints();
  }, []);

  const handleResolveComplaint = async (
    complaintId: number,
    action: boolean,
  ) => {
    try {
      setLoading(true);
      console.log(complaintId, action);
      await axios.post(
        `https://localhost:7268/api/admin/resolve-complaint?complaintId=${complaintId}&banUser=${action}`,
        {},
      );

      // Удаляем обработанную жалобу из списка
      setComplaints((prevComplaints) =>
        prevComplaints.filter(
          (complaint) => complaint.complaintId !== complaintId,
        ),
      );
    } catch (error) {
      console.log(complaintId);
      console.error("Ошибка при обработке жалобы:", error);
      setErrorMessage("Не удалось обработать жалобу. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Рассмотрение жалоб
      </h1>
      {errorMessage && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}
      <div className="bg-white rounded-lg shadow-lg p-4 max-h-[70vh] overflow-y-auto">
        {complaints.length === 0 ? (
          <p className="text-center text-gray-500">Нет незавершенных жалоб.</p>
        ) : (
          complaints.map((complaint) => (
            <div
              key={complaint.complaintId}
              className="border-2 border-black rounded-lg p-4 mb-4 flex justify-between items-center"
            >
              {/* Левая часть карточки */}
              <div>
                <p className="font-bold">
                  {complaint.userName} подал жалобу на{" "}
                  {complaint.reportedUserName}
                </p>
                <p className="text-gray-600 mt-2">{complaint.complaintText}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(complaint.createdAt).toLocaleDateString("ru-RU")}{" "}
                  {new Date(complaint.createdAt).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {/* Правая часть карточки */}
              <div className="flex flex-col space-y-2 ml-10">
                <button
                  onClick={() =>
                    (window.location.href = `/admin-page/reportedProfile/${complaint.reportedUserName}`)
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Посмотреть профиль
                </button>
                <button
                  onClick={() =>
                    handleResolveComplaint(complaint.complaintId, true)
                  }
                  className="bg-red text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Забанить пользователя
                </button>
                <button
                  onClick={() =>
                    handleResolveComplaint(complaint.complaintId, false)
                  }
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Пропустить жалобу
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

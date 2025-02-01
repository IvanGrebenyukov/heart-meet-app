import { FC, useState } from "react";

interface ComplaintDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (complaintText: string) => void;
  reportedUserName: string;
}

export const ComplaintDialog: FC<ComplaintDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  reportedUserName,
}) => {
  const [complaintText, setComplaintText] = useState("");

  const handleSubmit = () => {
    if (complaintText.trim() === "") {
      alert("Текст жалобы не может быть пустым.");
      return;
    }
    onSubmit(complaintText);
    setComplaintText("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          Вы действительно хотите пожаловаться на пользователя{" "}
          {reportedUserName}?
        </h2>
        <textarea
          value={complaintText}
          onChange={(e) => setComplaintText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          rows={4}
          placeholder="Введите текст жалобы"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Отменить
          </button>
          <button
            onClick={handleSubmit}
            className="bg-red text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

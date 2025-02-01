import { useState } from "react";

export const TextAreaWithButton = ({
  onSend,
}: {
  onSend: (text: string) => void;
}) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    }
  };

  return (
    <div className="flex items-center p-4 bg-white shadow-md">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите сообщение..."
        maxLength={1500}
        className="flex-1 resize-none border rounded-lg p-2 h-20 focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="ml-4 p-3 bg-blue-500 text-white rounded-full shadow-md"
      >
        ✉
      </button>
    </div>
  );
};

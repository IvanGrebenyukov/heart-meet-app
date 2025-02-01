export const MessageBubble = ({
  messageText,
  sentAt,
  isSentByCurrentUser,
}: any) => (
  <div
    className={`flex ${
      isSentByCurrentUser ? "justify-end" : "justify-start"
    } mb-4`}
  >
    <div
      className={`p-3 rounded-lg max-w-xs text-white ${
        isSentByCurrentUser ? "bg-blue-500" : "bg-gray-800"
      }`}
    >
      <p>{messageText}</p>
      <p className="text-xs text-gray-300 mt-1 text-right">
        {new Date(sentAt).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  </div>
);

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useRegistrationStore } from "../../stores/useRegistrationStore.ts";
import { TextAreaWithButton } from "../ui/inputs/TextAreaWithButton.tsx";
import { MessageBubble } from "../ui/selects/MessageBubble.tsx";

export const ChatPage = () => {
  const [chatData, setChatData] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isPollingActive, setIsPollingActive] = useState(true);
  const [currentDate, setCurrentDate] = useState<string | null>(null);

  const location = useLocation();
  const { targetUserName } = useParams<{ targetUserName: string }>(); // Получение targetUserName из маршрута
  const avatarUrl = location.state?.avatarUrl;
  const userData = useRegistrationStore((state) => state.data); // Получение currentUserName из store
  const currentUserName = userData.userName;

  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Группировка сообщений по дате
  const groupMessagesByDate = (messages: any[]) => {
    return messages.reduce((acc: any, message: any) => {
      const date = new Date(message.sentAt).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(message);
      return acc;
    }, {});
  };

  // Обновление текущей даты при прокрутке
  const handleScroll = () => {
    const container = messageContainerRef.current;
    if (!container) return;

    const childNodes = Array.from(container.childNodes) as HTMLElement[];
    for (const child of childNodes) {
      const { top } = child.getBoundingClientRect();
      if (top >= 0 && top <= 50) {
        setCurrentDate(child.getAttribute("data-date") || null);
        break;
      }
    }
  };

  // Загрузка данных чата
  const fetchChatData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7268/api/Chat/chat/${currentUserName}/${targetUserName}`,
      );
      setChatData(response.data);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error("Ошибка загрузки данных чата:", error);
    }
  };

  // Отправка сообщения
  const sendMessage = async (messageText: string) => {
    try {
      const newMessage = {
        messageText,
        sentAt: new Date().toISOString(),
        isSentByCurrentUser: true,
      };

      // Сохранение сообщения
      await axios.post(`https://localhost:7268/api/Chat/send-message`, {
        senderUserName: currentUserName,
        receiverUserName: targetUserName,
        messageText: messageText,
      });

      // Добавление в локальный массив
      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error);
    }
  };

  // Поллинг для обновления сообщений
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPollingActive) fetchChatData();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPollingActive]);

  useEffect(() => {
    fetchChatData();
  }, []);

  const groupedMessages = groupMessagesByDate(messages);

  if (!chatData) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="flex flex-col w-full h-screen bg-lightPink">
      {/* Верхнее меню */}
      <div className="p-4 bg-white shadow-md flex items-center">
        <button
          onClick={() => window.history.back()}
          className="p-2 bg-gray-200 rounded-lg shadow-sm mr-4"
        >
          ← Назад
        </button>
        {avatarUrl && (
          <img
            src={`https://localhost:7268${avatarUrl}`}
            alt="avatar"
            className="w-12 h-12 rounded-full mr-4"
          />
        )}
        <p className="font-bold text-lg">{chatData.userName}</p>
      </div>

      {/* Текущая дата при прокрутке */}
      {currentDate && (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-md">
          {currentDate}
        </div>
      )}

      {/* Блок с сообщениями */}
      <div
        className="flex-1 overflow-y-auto p-4 relative"
        ref={messageContainerRef}
        onScroll={handleScroll}
      >
        {messages[0].messageText === "Start a conversation!" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-gray-500 text-lg mb-2">Начните новый чат!</p>
            <span className="text-4xl">💬</span>
          </div>
        ) : (
          Object.entries(groupedMessages).map(([date, messages]) => (
            <div key={date} data-date={date}>
              {/* Разделитель с датой */}
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 text-sm">{date}</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              {/* Сообщения за эту дату */}
              {messages.map((message: any, index: number) => (
                <MessageBubble
                  key={index}
                  messageText={message.messageText}
                  sentAt={message.sentAt}
                  isSentByCurrentUser={message.isSentByCurrentUser}
                />
              ))}
            </div>
          ))
        )}
      </div>

      {/* Поле ввода текста */}
      <TextAreaWithButton onSend={sendMessage} />
    </div>
  );
};

import { MessageCircle } from "lucide-react";

const chats = [
  { id: "1", name: "Aisha Binti Rahman", lastMsg: "Is the tomato still available?", time: "2m", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face", unread: true },
  { id: "2", name: "Siti Nurhaliza", lastMsg: "I'll pick up the mangoes tomorrow!", time: "1h", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", unread: false },
  { id: "3", name: "Lee Wei Ming", lastMsg: "Thanks for the chili seeds 🌶️", time: "3h", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", unread: false },
];

const ChatsPage = () => {
  return (
    <div className="flex flex-col">
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-xl font-bold text-foreground">Chats</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Your conversations</p>
      </div>

      <div className="divide-y divide-border">
        {chats.map((chat) => (
          <button
            key={chat.id}
            className="flex items-center gap-3 px-5 py-4 w-full text-left hover:bg-muted/50 transition-colors"
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground truncate">{chat.name}</h3>
                <span className="text-[10px] text-muted-foreground shrink-0">{chat.time}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{chat.lastMsg}</p>
            </div>
            {chat.unread && (
              <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
            )}
          </button>
        ))}
      </div>

      {chats.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <MessageCircle className="w-12 h-12 mb-3" />
          <p className="text-sm">No conversations yet</p>
        </div>
      )}
    </div>
  );
};

export default ChatsPage;

"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, MessageSquare } from "lucide-react";

// Mock Database for Forum Posts
interface ForumPost {
  id: number;
  author: string;
  role: string;
  content: string;
  timestamp: string;
}

const INITIAL_POSTS: ForumPost[] = [
  { id: 1, author: "Dr. Adebayo", role: "lecturer", content: "Welcome to the central forum. Please keep discussions academic and respectful.", timestamp: "2026-05-01 09:00 AM" },
  { id: 2, author: "Mary Samuel", role: "student", content: "Thank you Dr. Adebayo! Will the midterm be open book?", timestamp: "2026-05-01 09:15 AM" },
];

export default function ForumPage() {
  const user = useAuthStore((state) => state.user);
  const [posts, setPosts] = useState<ForumPost[]>(INITIAL_POSTS);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when a new message is added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [posts]);

  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const post: ForumPost = {
      id: posts.length + 1,
      author: user.fullname,
      role: user.role,
      content: newMessage,
      timestamp: new Date().toLocaleString("en-US", { 
        year: 'numeric', month: '2-digit', day: '2-digit', 
        hour: '2-digit', minute: '2-digit' 
      }),
    };

    setPosts([...posts, post]);
    setNewMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">University Forum</h2>
        <p className="text-slate-500">Global discussion board for all students and staff.</p>
      </div>

      <Card className="border-slate-200 shadow-sm flex flex-col h-[600px]">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <CardTitle className="flex items-center text-lg gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Live Discussion
          </CardTitle>
        </CardHeader>
        
        {/* Messages Area */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {posts.map((post) => {
            const isMe = user?.fullname === post.author;
            return (
              <div key={post.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-sm text-slate-900">{post.author}</span>
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm ${
                    post.role === 'admin' ? 'bg-red-100 text-red-700' :
                    post.role === 'lecturer' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {post.role}
                  </span>
                  <span className="text-xs text-slate-400">{post.timestamp}</span>
                </div>
                <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm ${
                  isMe ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-slate-100 text-slate-800 rounded-tl-sm'
                }`}>
                  {post.content}
                </div>
              </div>
            );
          })}
        </CardContent>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <form onSubmit={handlePostMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
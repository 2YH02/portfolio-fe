"use client";

import { GlassBox } from "@/components/ui/GlassBox";
import { Auth, User } from "@/lib/api/auth";
import { useState } from "react";
import { motion } from "motion/react";

interface AuthFormProps {
  setRole: (role: User) => void;
}

const formVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const buttonVariants = {
  hover: { scale: 1.03 },
  tap: { scale: 0.97 },
};

const AuthForm = ({ setRole }: AuthFormProps) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await Auth(user, password);

    setRole(data.role);

    if (data.role === "Guest") {
      setMessage("사용자 정보를 확인해주세요.");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto mt-32 p-6 backdrop-blur-lg bg-white/10 border border-white/10 shadow-2xl space-y-6"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold text-center">사용자 확인</h2>

      <div>
        <label htmlFor="text" className="block text-sm font-medium">
          사용자
        </label>
        <input
          type="text"
          id="text"
          required
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="text-xs text-red-300 text-center">{message}</div>
      <GlassBox className="p-0 rounded-md" withAction>
        <motion.button
          type="submit"
          className="w-full py-2 px-4 font-semibold"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          확인하기
        </motion.button>
      </GlassBox>
    </motion.form>
  );
};

export default AuthForm;

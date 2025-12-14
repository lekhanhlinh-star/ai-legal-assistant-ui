import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import legalAiHero from "@/assets/legal-ai-hero.png";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng bạn đến với Trợ Lý Pháp Lý AI",
      });
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a1a]">
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={legalAiHero}
          alt="AI Ứng dụng trong ngành luật"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a1a]/80" />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-[#0a0a1a] to-[#0f1a2e]">
        <div className="w-full max-w-md animate-fade-in">
          <div className="bg-[#111827]/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-cyan-500/20">
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 mb-4 border border-cyan-500/30">
                <img 
                  src={legalAiHero} 
                  alt="Logo" 
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Trợ Lý Pháp Lý AI
              </h1>
              <p className="text-cyan-400/80 text-sm">
                AI Ứng dụng trong ngành Luật
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-cyan-300 font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500/60" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12 bg-[#0a0a1a]/60 border-cyan-500/30 text-white placeholder:text-cyan-500/40 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-cyan-300 font-medium">
                  Mật khẩu
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500/60" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 pr-11 h-12 bg-[#0a0a1a]/60 border-cyan-500/30 text-white placeholder:text-cyan-500/40 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500/60 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-cyan-500/30 bg-[#0a0a1a] text-cyan-500 focus:ring-cyan-400/20"
                  />
                  <span className="text-cyan-400/70">Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                  Quên mật khẩu?
                </a>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Đang đăng nhập...
                  </span>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-cyan-400/60">
                Chưa có tài khoản?{" "}
                <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                  Đăng ký ngay
                </a>
              </p>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-center text-xs text-cyan-500/40 mt-6">
            © 2024 Trợ Lý Pháp Lý AI. Mọi quyền được bảo lưu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

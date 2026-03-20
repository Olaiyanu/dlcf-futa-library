import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";

import VisitorLayout from "@/components/layouts/VisitorLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Catalog from "./pages/library/Catalog";
import BookDetail from "./pages/library/BookDetail";
import Shop from "./pages/store/Shop";
import BlogList from "./pages/blog/BlogList";
import BlogDetail from "./pages/blog/BlogDetail";
import QuizList from "./pages/quiz/QuizList";
import QuizPlay from "./pages/quiz/QuizPlay";
import Leaderboard from "./pages/quiz/Leaderboard";
import RentalList from "./pages/rentals/RentalList";
import MemberDashboard from "./pages/dashboard/MemberDashboard";
import Profile from "./pages/profile/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route element={<VisitorLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/library" element={<Catalog />} />
              <Route path="/library/:id" element={<BookDetail />} />
              <Route path="/store" element={<Shop />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/quiz" element={<QuizList />} />
              <Route path="/quiz/leaderboard" element={<Leaderboard />} />
              <Route path="/rentals" element={<RentalList />} />
            </Route>

            {/* Protected routes */}
            <Route element={<ProtectedRoute><VisitorLayout /></ProtectedRoute>}>
              <Route path="/quiz/:id" element={<QuizPlay />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Dashboard routes */}
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<MemberDashboard />} />
              <Route path="/dashboard/books" element={<div className="text-muted-foreground">My Borrowed Books — Coming soon</div>} />
              <Route path="/dashboard/orders" element={<div className="text-muted-foreground">Order History — Coming soon</div>} />
              <Route path="/dashboard/quizzes" element={<div className="text-muted-foreground">My Quiz Results — Coming soon</div>} />
              <Route path="/dashboard/rentals" element={<div className="text-muted-foreground">My Rentals — Coming soon</div>} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

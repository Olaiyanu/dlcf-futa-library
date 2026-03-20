import { Outlet } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import Navbar from "./Navbar";

const Footer = () => (
  <footer className="border-t border-border bg-primary py-12 text-primary-foreground">
    <div className="container grid gap-8 md:grid-cols-3">
      <div>
        <h3 className="font-display text-lg font-bold">DLCF FUTA LIBRARY</h3>
        <p className="mt-2 text-sm opacity-80">
          Deeper Life Campus Fellowship, Federal University of Technology Akure. Raising Saintly Intellectuals.
        </p>
      </div>
      <div>
        <h4 className="font-semibold">Quick Links</h4>
        <ul className="mt-2 space-y-1 text-sm opacity-80">
          <li>Library</li>
          <li>Bookstore</li>
          <li>Blog</li>
          <li>Quiz</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold">Contact</h4>
        <div className="mt-2 space-y-2 text-sm opacity-80">
          <p>
            Federal University of Technology, Akure<br />
            Ondo State, Nigeria
          </p>
          <p>
            <a href="mailto:dlcf.futa23@gmail.com" className="hover:text-accent transition-colors">
              📧 dlcf.futa23@gmail.com
            </a>
          </p>
          <p>
            <a href="tel:+2348069625869" className="hover:text-accent transition-colors">
              📞 +234 (0) 8069625869
            </a>
          </p>
        </div>
      </div>
    </div>
    <div className="container mt-8 border-t border-primary-foreground/20 pt-4 text-center text-xs opacity-60">
      © {new Date().getFullYear()} DLCF FUTA LIBRARY. All rights reserved.
    </div>
  </footer>
);

const WhatsAppButton = () => (
  <a
    href="https://wa.me/2348069625869"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
  >
    <MessageCircle className="h-7 w-7" />
  </a>
);

const VisitorLayout = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default VisitorLayout;

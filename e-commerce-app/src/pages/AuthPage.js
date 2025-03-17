import { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { toast } from "react-toastify";
import "../styles/AuthPage.css";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignUp ? "https://fakeapi.com/signup" : "https://fakeapi.com/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-logo-container">
        <span className="auth-logo">ShopSphere</span>
      </div>
      <Card className="auth-card">
        <CardContent>
          <h2 className="auth-title">{isSignUp ? "Create an Account" : "Welcome Back!"}</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            {isSignUp && (
              <Input name="name" placeholder="Enter your full name" onChange={handleChange} required className="auth-input" />
            )}
            <Input name="email" type="email" placeholder="Enter your email" onChange={handleChange} required className="auth-input" />
            <Input name="password" type="password" placeholder="Enter your password" onChange={handleChange} required className="auth-input" />
            <Button type="submit" className="auth-button">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>
          <p className="auth-toggle">
            {isSignUp ? "Already have an account? " : "New here? "}
            <span onClick={() => setIsSignUp(!isSignUp)} className="auth-link">
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

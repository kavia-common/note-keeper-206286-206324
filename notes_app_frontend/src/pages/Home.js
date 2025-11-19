import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Simple page to redirect to /notes.
 */
export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/notes");
  }, [navigate]);
  return null;
}

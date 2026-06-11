import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      navigate('/login');
      return;
    }
    try {
      const user = JSON.parse(stored);
      if (user.role !== 'admin') {
        navigate('/profile');
      }
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  return <>{children}</>;
}
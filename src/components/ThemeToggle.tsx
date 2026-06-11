import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';

  const toggle = () => {
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  return (
    <button
      onClick={toggle}
      className="p-2 text-zinc-500 hover:text-gold-500 transition-colors touch-manipulation"
      title={`Switch to ${current === 'dark' ? 'light' : 'dark'} mode`}
    >
      {current === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

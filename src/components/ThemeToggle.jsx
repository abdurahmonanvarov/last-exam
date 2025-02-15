import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="swap swap-rotate mb-[24px] cursor-pointer">
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />

      {/* Sun icon (Light mode) */}
      <svg
        className="swap-on w-[20px] h-[20px] fill-current text-yellow-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5Z" />
      </svg>

      {/* Moon icon (Dark mode) */}
      <svg
        className="swap-off w-[20px] h-[20px] fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z" />
      </svg>
    </label>
  );
}

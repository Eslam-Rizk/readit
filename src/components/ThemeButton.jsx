import React, { useState } from "react";
import { changeTheme } from "../utils/Theme";

export default function ThemeButton() {
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const handleChange = (e) => {
    changeTheme(e.target.value);
    setTheme(e.target.value);
  };

  return (
    <label style={{ display: "block", textAlign: "right" }}>
      <select
        className="text-right appearance-none bg-transparent border-none p-0 m-0 focus:outline-none cursor-pointer"
        value={theme}
        onChange={handleChange}
        aria-label="Select theme"
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </label>
  );
}

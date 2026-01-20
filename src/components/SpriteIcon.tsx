// Описуємо, які пропси (властивості) прийматиме компонент
interface SpriteIconProps {
  id: string; // Наприклад, 'twitter', 'github'
  className?: string; // Для стилів Tailwind (розмір, колір)
}

export default function SpriteIcon({ id, className = "w-6 h-6" }: SpriteIconProps) {
  return (
    // fill-current означає, що колір іконки буде залежати від кольору тексту батьківського елемента (text-white, text-mono-400)
    <svg className={`fill-current ${className}`}>
      {/* Цей тег каже браузеру: "Візьми іконку з файлу /sprite.svg, у якої ID дорівнює тому, що ми передали" */}
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
}
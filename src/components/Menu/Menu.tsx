function Menu({ onSelect }) {
  const buttons = [
    { label: "Manage Ressources" },
    { label: "Manage Events" },
    { label: "Notifications" },
  ];

  return (
    <div className="flex flex-col items-center gap-6 p-6 text-sm">
      {buttons.map((btn, index) => (
        <button key={index} type="button" onClick={() => onSelect(btn.label)}>
          {btn.label}
        </button>
      ))}
    </div>
  );
}

export default Menu;

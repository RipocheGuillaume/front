function Menu({ onSelect }) {
  const buttons = [
    { label: "Manage Ressources" },
    { label: "Manage Events" },
    { label: "Notifications" },
  ];

  return (
    <div className="flex  items-center gap-6 p-6 text-sm ">
      {buttons.map((btn, index) => (
        <div className="text-gray-300 hover:text-black">
          <button key={index} type="button" onClick={() => onSelect(btn.label)}>
            {btn.label}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Menu;

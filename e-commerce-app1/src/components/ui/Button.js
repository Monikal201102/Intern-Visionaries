export function Button({ children, type = "button", className, onClick }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${className}`}
      >
        {children}
      </button>
    );
  }
  
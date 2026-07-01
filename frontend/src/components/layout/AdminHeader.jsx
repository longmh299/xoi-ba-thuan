export default function AdminHeader({
  onMenuClick,
}) {
  return (
    <header
      className="
        sticky
        top-0
        bg-white
        shadow
        z-30
      "
    >
      <div
        className="
          max-w-md
          mx-auto
          h-16
          flex
          items-center
          justify-between
          px-4
        "
      >
        <button
          onClick={onMenuClick}
          className="text-3xl"
        >
          ☰
        </button>

        <div className="text-center">
          <h1 className="font-bold text-xl">
            🍚 Bà Thuận
          </h1>
        </div>

        <div className="w-8" />
      </div>
    </header>
  );
}
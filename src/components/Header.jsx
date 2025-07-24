import Modal from "./Modal";
const Header = () => {
  return (
    <header className="bg-base-200 p-4 shadow-md">
      <div className="navbar justify-between">
        <h1 className="text-2xl font-bold"> Personal Diary</h1>
        <nav>
          <ul className="menu menu-horizontal px-1">
            <li>
              <label
                htmlFor="new-entry-modal"
                className="btn btn-sm btn-primary modal-button"
              >
                + Neuer Eintrag
              </label>
            </li>
            <li>
              <a>Theme</a>
            </li>
            <li>
              <a>Info</a>
            </li>
            <li>
              <a>Search</a>
            </li>
          </ul>
        </nav>
      </div>
      <Modal />
    </header>
  );
};

export default Header;

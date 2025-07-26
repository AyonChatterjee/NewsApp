const Navbar = ({ setCategory, theme, toggleTheme }) => {
    return (
        <nav className={`navbar navbar-expand-lg ${theme === 'light' ? 'bg-light' : 'bg-dark'} navbar-${theme}`} data-bs-theme={theme}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><span className={`badge ${theme === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'} fs-4`}>
                    NewsMag
                </span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {[
                            "business",
                            "entertainment",
                            "health",
                            "science",
                            "sports"
                        ].map((item) => (
                            <li className="nav-item" key={item}>
                                <div
                                    className={`nav-link custom-nav-link`}
                                    onClick={() => setCategory(item)}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </div>
                            </li>
                        ))}
                    </ul>


                    <button
                        className={`btn btn-${theme === 'light' ? 'dark' : 'light'} me-3`}
                        onClick={toggleTheme}
                        type="button"
                    >
                        {theme === "light" ? "🌙 Dark" : "☀️ Light"} Mode
                    </button>

                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar


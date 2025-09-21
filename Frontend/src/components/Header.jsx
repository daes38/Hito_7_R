import headerBg from "../assets/Header.jpg";

const Header = () => {
    const headerStyle = {
        backgroundImage: `url(${headerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        padding: '80px 20px',
        textShadow: '2px 2px 4px rgba(255, 0, 0, 0.7)',
        borderRadius: '10px',
    };

    return (
        <header style={headerStyle} className="text-center">
            <h1 className="display-4">Pizzería Mamma Mía</h1>
            <p className="lead">🍕 ¡Las mejores pizzas que podrás encontrar! 🍕</p>
        </header>
    );
};

export default Header;

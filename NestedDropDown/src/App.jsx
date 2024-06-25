import React, { useState } from 'react';
import './App.css';

const menuData = {
    "Software Development": {
        "Web design": { description: "Design beautiful websites." },
        "Web development": {
            "Frontend": { description: "Build the client-side of web applications." },
            "Backend": {
                "NodeJS": { description: "A JavaScript runtime built on Chrome's V8 JavaScript engine." },
                "PHP": { description: "A popular general-purpose scripting language." },
                "JAVA": {
                    "Spring": { description: "A powerful, feature-rich, and flexible framework for building Java applications." },
                    "Hibernate": { description: "An object-relational mapping tool for Java." }
                }
            }
        }
    }
};

const Dropdown = ({ items, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (key) => {
        setActiveItem(activeItem === key ? null : key);
    };

    return (
        <div className="dropdown">
            <div onClick={handleToggle} className="dropdown-label">
                {label} {items && (isOpen ? '▲' : '▼')}
            </div>
            {isOpen && items && (
                <div className="dropdown-content">
                    {Object.keys(items).map((key) => (
                        <div key={key} className="dropdown-item">
                            <div onClick={() => handleItemClick(key)} className="dropdown-label">
                                {key} {items[key] && items[key].description && '▼'}
                            </div>
                            {activeItem === key && items[key] && (
                                <div className="item-description">
                                    {items[key].description}
                                    {items[key] && typeof items[key] === 'object' && !items[key].description && (
                                        <Dropdown key={key} label={key} items={items[key]} />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

function App() {
    return (
        <div className="App">
            <h1>Nested Dropdown Menu</h1>
            <div className="menu">
                {Object.keys(menuData).map((key) => (
                    <Dropdown key={key} label={key} items={menuData[key]} />
                ))}
            </div>
        </div>
    );
}

export default App;

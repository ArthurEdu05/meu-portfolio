import React, { useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
    useEffect(() => {
        const navToggle = document.getElementById("nav-toggle");
        const navList = document.querySelector(".nav-list");

        if (!navToggle || !navList) return;

        const handleToggle = () => {
            navList.classList.toggle("open");
            navToggle.classList.toggle("active");
        };

        navToggle.addEventListener("click", handleToggle);

        // Dropdown click (opcional se estiver usando dropdowns)
        const links = navList.querySelectorAll("li > a:not(:only-child)");
        const closeAllDropdowns = () => {
            navList.querySelectorAll(".nav-dropdown").forEach(dropdown => {
                dropdown.style.display = "none";
            });
        };

        links.forEach(link => {
            link.addEventListener("click", e => {
                e.preventDefault();
                const dropdown = link.nextElementSibling;
                if (dropdown) {
                    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
                }
                e.stopPropagation();
            });
        });

        document.addEventListener("click", closeAllDropdowns);

        return () => {
            navToggle.removeEventListener("click", handleToggle);
            document.removeEventListener("click", closeAllDropdowns);
        };
    }, []);


    return (
        <section className="navigation">
            <div className="nav-container">
                <nav>
                    <div className="nav-mobile">
                        <a id="nav-toggle" href="#!"><span></span></a>
                    </div>
                    <ul className="nav-list">
                        <li><a href="#home">Início</a></li>
                        <li><a href="#about">Sobre</a></li>
                        <li><a href="#skills">Habilidades</a></li>
                        <li><a href="#projects">Projetos</a></li>
                        <li><a href="#contact">Contato</a></li>
                    </ul>
                </nav>
            </div>
        </section>

    );
}

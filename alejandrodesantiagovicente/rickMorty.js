// rickMorty.js
document.addEventListener("DOMContentLoaded", function() {
    // Inicializa AOS
    AOS.init();

    fetch("https://rickandmortyapi.com/api/character/")
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector(".container");
        const row = document.createElement("div");
        row.className = "row";
        container.appendChild(row);
        data.results.forEach((character, index) => {
            const col = document.createElement("div");
            col.className = "col-md-4"; // Crea una columna que ocupe un tercio del ancho de la fila
            const card = document.createElement("div");
            card.className = "card shadow-sm";
            // Agrega el atributo data-aos a la tarjeta
            // Las tarjetas se desplazan desde diferentes direcciones dependiendo de su posición
            if (index % 3 === 0) {
                card.setAttribute("data-aos", "fade-right");
            } else if (index % 3 === 1) {
                card.setAttribute("data-aos", "fade-up");
            } else {
                card.setAttribute("data-aos", "fade-left");
            }
            // Agrega un retraso a las animaciones y cambia la duración de las mismas
            card.setAttribute("data-aos-delay", "100");
            card.setAttribute("data-aos-duration", "1000");
            const img = document.createElement("img");
            img.className = "card-img-top";
            img.setAttribute("data-aos", "zoom-in"); // Agrega una animación de "zoom-in" a las imágenes
            if (character.name === "Antenna Rick") {
                img.src = '/img/antennarick.jpg';
            } else {
                img.src = character.image;
            }
            img.onerror = function() {
                img.src = '/img/imagen_de_respaldo.jpg';
            };
            const cardBody = document.createElement("div");
            cardBody.className = "card-body";
            const cardTitle = document.createElement("h5");
            cardTitle.className = "card-title";
            cardTitle.textContent = character.name;
            cardBody.appendChild(cardTitle);
            const cardText = document.createElement("p");
            cardText.className = "card-text"; 
            cardText.textContent = `Species: ${character.species} \n Status: ${character.status} \n Type: ${character.type}`; // Añade la información del personaje
            cardBody.appendChild(cardText);
            card.appendChild(img);
            card.appendChild(cardBody);
            col.appendChild(card);
            row.appendChild(col);
        });
    })
    .catch(error => console.error("Error al obtener datos:", error));
});
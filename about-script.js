const words = [
    "Hallo", "Design", "Chaos", "Wort", "Scroll", "Zufall",
    "Pixel", "Interface", "Fallen", "Wow", "Klick", "Nice"
  ];

  const box = document.getElementById("wordBox");

  const boxRect = box.getBoundingClientRect(); // misst Größe und Position
  const boxHeight = boxRect.height;
  const boxWidth = boxRect.width;

  words.forEach(word => {
    const span = document.createElement("span");
    span.classList.add("word");
    span.textContent = word;

    // Zufällige linke Position innerhalb der Box
    const x = Math.random() * (boxWidth - 100); // 100 als Sicherheitspuffer
    // Zufällige "Endposition" nahe dem unteren Rand
    const y = boxHeight - 40 - Math.random() * 40;

    const rotation = Math.random() * 60 - 30;

    span.style.left = `${x}px`;
    span.style.setProperty("--final-top", `${y}px`);
    span.style.transform = `rotate(${rotation}deg)`;
    span.style.animationDelay = `${Math.random() * 0.5}s`;

    box.appendChild(span);
  });
const container = document.querySelector('.skills-container');
const skills = Array.from(document.querySelectorAll('.skill'));

let activeSkill = null;
let originalOrder = [...skills]; // Ursprüngliche Reihenfolge merken

skills.forEach(skill => {
  skill.addEventListener('click', e => {
    e.stopPropagation();

    if (activeSkill === skill) {
      // Deaktivieren
      skill.classList.remove('active');
      skills.forEach(s => s.classList.remove('hidden'));

      // Reihenfolge zurücksetzen
      originalOrder.forEach(s => container.appendChild(s));

      activeSkill = null;
    } else {
      // Neue Box aktivieren
      skills.forEach(s => {
        if (s !== skill) {
          s.classList.add('hidden');
          s.classList.remove('active');
        }
      });

      skill.classList.add('active');
      skill.classList.remove('hidden');

      // Nach oben verschieben
      container.prepend(skill);

      activeSkill = skill;
    }
  });
});

// Klick außerhalb → alles zurücksetzen
document.addEventListener('click', e => {
  if (activeSkill) {
    activeSkill.classList.remove('active');
    skills.forEach(s => s.classList.remove('hidden'));

    // Reihenfolge zurücksetzen
    originalOrder.forEach(s => container.appendChild(s));

    activeSkill = null;
  }
});

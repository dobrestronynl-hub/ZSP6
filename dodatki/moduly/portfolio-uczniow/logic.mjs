export const works = [
  {
    "id": "praca-1",
    "category": "plastyka",
    "title": "Autoportret · praca uczniowska, 2025",
    "alt": "Rysunkowy autoportret, twarz otoczona ekspresyjnymi pasmami włosów",
    "src": "https://zsp6tom.pl/wp-content/uploads/2025/11/Amelia-Wlodarczyk-Kopiowanie-768x1075.jpg",
    "width": 768,
    "height": 1075,
    "source": "https://zsp6tom.pl/?page_id=256"
  },
  {
    "id": "praca-2",
    "category": "plastyka",
    "title": "Płaskorzeźba · Alicja Fijałkowska",
    "alt": "Gliniana płaskorzeźba przedstawiająca statek na wzburzonym morzu",
    "src": "https://zsp6tom.pl/wp-content/uploads/2025/12/alicja-Kopiowanie-768x768.jpg",
    "width": 768,
    "height": 768,
    "source": "https://zsp6tom.pl/?page_id=256"
  },
  {
    "id": "praca-3",
    "category": "plastyka",
    "title": "Projektowanie przestrzeni · dyplom 2026",
    "alt": "Autorka prezentuje plansze projektu przestrzeni z wizualizacjami wnętrz",
    "src": "https://zsp6tom.pl/wp-content/uploads/2026/04/1-Maja-1-Kopiowanie-768x576.jpg",
    "width": 768,
    "height": 576,
    "source": "https://zsp6tom.pl/?page_id=256"
  },
  {
    "id": "praca-4",
    "category": "grafika",
    "title": "Żuk · ćwiczenie z typografii",
    "alt": "Czarno-biały żuk zbudowany z form liter",
    "src": "https://zsp6tom.pl/wp-content/uploads/2026/01/3-Kopiowanie-768x918.jpg",
    "width": 768,
    "height": 918,
    "source": "https://zsp6tom.pl/?page_id=258"
  },
  {
    "id": "praca-5",
    "category": "grafika",
    "title": "Sylwetka przedmiotu · opracowanie graficzne",
    "alt": "Zestaw graficznych opracowań sylwetek przedmiotów na białych kartkach",
    "src": "https://zsp6tom.pl/wp-content/uploads/2026/11/1794472369512-kopia-Kopiowanie-768x556.jpg",
    "width": 768,
    "height": 556,
    "source": "https://zsp6tom.pl/?page_id=256"
  },
  {
    "id": "praca-6",
    "category": "foto",
    "title": "Portret kreatywny · fotografia studyjna",
    "alt": "Czarno-biały portret z nakładającymi się ujęciami twarzy",
    "src": "https://zsp6tom.pl/wp-content/uploads/2026/09/ameliaWbw-Kopiowanie.jpg",
    "width": 576,
    "height": 864,
    "source": "https://zsp6tom.pl/?page_id=260"
  },
  {
    "id": "praca-7",
    "category": "foto",
    "title": "Jesień w obiektywie · Alina Nazaruk",
    "alt": "Dziewięć fotografii jesiennych liści i kompozycji w żółtych barwach",
    "src": "https://zsp6tom.pl/wp-content/uploads/2026/10/Alina-Nazaruk-Kopiowanie-768x805.jpg",
    "width": 768,
    "height": 805,
    "source": "https://zsp6tom.pl/?page_id=260"
  },
  {
    "id": "praca-8",
    "category": "fryzjerstwo",
    "title": "Fryzury minionych czasów · praca uczniowska",
    "alt": "Wysokie upięcie blond włosów z lokami wykonane na główce treningowej",
    "src": "https://zsp6tom.pl/wp-content/uploads/2023/02/20220212_184340-768x1024.jpg",
    "width": 768,
    "height": 1024,
    "source": "https://zsp6tom.pl/?page_id=262"
  }
];

export const categories = { all:'Wszystkie',plastyka:'Plastyka',foto:'Fotografia',grafika:'Grafika',fryzjerstwo:'Fryzjerstwo' };
export function filterWorks(category='all',collection=works) {
  return collection.filter(item=>category==='all'||item.category===category);
}
export function moveIndex(index,step,length) {
  if(!Number.isInteger(length)||length<1) return -1;
  return ((index+step)%length+length)%length;
}

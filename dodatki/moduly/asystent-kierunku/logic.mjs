export const COURSES = Object.freeze({
  plastyk: { title: 'Liceum Sztuk Plastycznych', interest: 'Rysunek, malarstwo i przestrzeń', description: 'Kształcenie plastyczne łączy rozwijanie warsztatu artystycznego z projektowaniem graficznym i projektowaniem przestrzeni.', why: 'Wybrałeś pracę z rysunkiem, malarstwem lub formą przestrzenną. Właśnie tym obszarom warto przyjrzeć się w ofercie liceum.', url: 'https://zsp6tom.pl/?page_id=3467', school: 'Liceum Sztuk Plastycznych im. Stanisława Wyspiańskiego' },
  grafik: { title: 'Technik grafiki i poligrafii cyfrowej', interest: 'Grafika, skład i druk', description: 'Kierunek łączy projektowanie materiałów graficznych z przygotowaniem publikacji i procesem druku cyfrowego.', why: 'Wybrałeś projektowanie grafiki i publikacji. Ten kierunek pozwala poznać drogę od projektu do gotowego wydruku.', url: 'https://zsp6tom.pl/?page_id=3520', school: 'Technikum nr 5 im. Stanisława Wyspiańskiego' },
  foto: { title: 'Technik fotografii i multimediów', interest: 'Fotografia, film i multimedia', description: 'Poznaj kształcenie związane z fotografią, pracą ze światłem oraz tworzeniem i obróbką materiałów multimedialnych.', why: 'Wybrałeś fotografię i multimedia. W opisie kierunku znajdziesz informacje o pracy z obrazem i narzędziami do jego opracowania.', url: 'https://zsp6tom.pl/?page_id=23259', school: 'Technikum nr 5 im. Stanisława Wyspiańskiego' },
  fryzjer: { title: 'Technik usług fryzjerskich', interest: 'Fryzjerstwo, wizerunek i stylizacja', description: 'Poznaj kierunek związany z usługami fryzjerskimi, stylizacją oraz praktycznym przygotowaniem do zawodu.', why: 'Wybrałeś pracę z fryzurą i wizerunkiem. Program usług fryzjerskich jest właściwym miejscem do dalszego poznania tej dziedziny.', url: 'https://zsp6tom.pl/?page_id=23255', school: 'Technikum nr 5 im. Stanisława Wyspiańskiego' }
});

export function recommend(interest, next = 'oferta') {
  if (typeof interest !== 'string' || !Object.hasOwn(COURSES, interest)) return null;
  const course = COURSES[interest];
  const recruitment = next === 'rekrutacja';
  return { ...course, action: recruitment ? 'Sprawdź oficjalne zasady rekrutacji' : 'Poznaj oficjalny program kierunku', actionUrl: recruitment ? 'https://zsp6tom.pl/?page_id=2537' : course.url };
}

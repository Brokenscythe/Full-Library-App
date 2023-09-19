# Sve biblioteke(npm i) su u root-u projekta.
# Fullstack-Library-App

Web aplikacija 'Online Biblioteka' je admin panel. Mora imati sekcije:
dashboard, bibliotekar, učenici, knjige, autori, izdavanje knjiga, te settings.

## Dashboard
Dashboard je prikaz svih aktivnosti sa widgetom koji graficki prikazuje statistiku trenutnih transakcija knjiga. Na dnu dashboarda se stalno učitava dugme 'show' i pokazuje po 10 linija. To se dešava dok se sve linije ne prikažu, infinite show more.

Dashboard u demo prikazu takodje ima i widget sa prikazom pending zahtjeva za rezervacijom. To ce biti dodano tek kada se bude radila mobilna aplikacija.

## Korisnici
Klik na Korisnika vodi na profil korisnika. To može biti bibliotekar ili učenik.

Unos svih osoba je isti. Moguće je resetovati šifru i izmijeniti podatke. Svaki korisnik ima i profilnu fotografiju.

## Knjige
Knjige se prikazuju u gridu. Klikom na 'prikazi detaljnije' dolazi se do prikaza konkretne knjige koja ima osnovne podatke, specifikaciju, evidenciju iznajmljivanja i multimediju. 
Evidencija iznajmljivanja kod konkretne knjige vodi na grid s prikazom transakcija za tu konkretnu knjigu. Jedna knjiga može imati više primjeraka (naslova).

Ovdje vidimo primjer kako svi gridovi moraju biti rijeseni: 

Nad svim gridovima u aplikaciji se u slučajevima single check-a mora pojaviti plava traka s opcijama koje se inače nalaze u drop down meniu na tri tačkice.

Kod multiple check-a mora se pojaviti samo opcija 'Izbrisi'.

## Konkretna knjiga
Podatke o količini primjeraka prikazuje desni info panel u gornjem dijelu. Donji dio istog panela prikazuje aktivnosti vezane za tu knjigu te na dnu ima dugme 'Prikazi sve' koje vodi na Dashboard uz primijenjen filter za tu konkretnu knjigu.

Evidencija iznajmljivanja kod konkretne knjige prikazuje evidenciju za tu knjigu. Isto vrijedi i za evidencije iznamjljivanja kod bibliotekara i učenika. Radi se o primjeni filtera za konkretnu knjigu, bibliotekara, odnosno učenika.

## Evidencija iznajmljivanja
Evidencija iznajmljivanja kao sekcija prikazuje sve transakcije bez primijenjenog filtera. Tu imamo evidencije izdatih knjiga, vracenih knjiga, knjiga u prekoracenju, te evidencije aktivnih rezervacija i arhiviranih rezervacija.

## Rezervacije
Aktivne rezervacije su pending zahtjevi za rezervaciju (to ce biti dodano tek kada se bude radila prateca mobilna aplikacija), zatim odbijene rezervacije i rodobrene rezervacije(tj rezervisane knjige). Na tri tockice se prikazuju opcije pogledaj detalje, izdaj knjigu, otpisi knjigu.

Arhivirane rezervacije su knjige izdate na temelju rezervacije i istekle rezervacije. Tu se na tri tackice prikazuje samo opcija pogledaj detalje.

Svaka rezervacija sada ce biti automatski odobrena jer ce ju uiraditi bibliotekar preko web aplikacije, odnosno admin panela. Potrebno je zabiljeziti ko je rezervisao i za koga (kojeg učenika).

Odobrenja rezervacija pojavit će se tek kada se bude radila mobilna aplikacija jer će tada moći zahtjeve slati i učenici. Rezervacija koju iuradi bibliotekar uvijek se automatski odobrava.


## Settings
Settings sadrzi polisu, kategorije, zanrove, izdavaca, povez, format, pismo.

Polisa definira rok za rezervaciju (po isteku tog roka, rezervacije istice, odnosno brise se), rok vracanja (30 dana), rok konflikta (nakon roka vracanja nastupa rok konflikta i tu treba definirati kada se poduzima akcija usmjerena osobi koja je prekoracila rok konflikta, npr 35 dana odnosno 5 dana nakon isteka roka vracanja)

Ostale sekcije u Settings-u se odnose na osnovne detalje i specifikaciju samih knjiga.

## Izdaj knjigu
Prikaz izdavanja knjige ima traku u koju se dodaje ucenik koji zaduzuje knjigu, moguce je birati i padajuce liste svih ucenika.

Ispod toga nalaze se dvije trake za upisivanje datuma. Lijeva je datum izdavanja knjige. Desna je datum vracanja knjige. Lijeva  traka se popunjava preko drop down kalendara, desna je u korelaciji s lijevom na nacin da se automatski popunjava datumom koji je 30 dana kasniji od onoga u lijevoj traci.

## Header 
Header u desnom gorenjm čošku ima notifikacije, opciju za dodavanje ( + ) i profil.
Na opciju za dodavanje moguce je unijeti novi unos: bibliotekar, učenik, knjiga, autor. 
Profilna fotografija vodi do profila korisnika ili logout-a.
Notifikacije će se koristiti tek kada se uradi mobilna aplikacija.

## Profil korisnika
Moguce je resetovati sifur, izmijeniti podatke i izbrisati korisnika.
Podaci su ime i prezime, tip korisnika, JMBG, Email, korisnicko ime, broj logovanja, posljednje logovanje.
Kod unosa ili izmjene korisnika, javljaju se obavezna polja oznacena crvenom zvjezdicom u prototipu.

## Grid korisnika
u gridu korisnika, na tri tockice nalaze se opcije pogledaj detalje (vodi na profil korisnika), resetuj sifru, izmijeni korisnik i izbrisi korisnika.

kada se odabere signel check, te se opcije moraju pojaviti u plavoj liniji na vrhu. (kao kod grida knjige). Kad se odabere multiple check, u plavoj traci se pojavljuje samo izbrisi.

## Otpisi knjigu
Grid otpisi knjigu sluzi za otpisati knjige koje se nikad nece vratiti. Da bi se knjiga otpisala, mora se selektovati na gridu i onda se donji desni zeleni gumb pojavi kao klikabilan. Dok nista nije selektovano, taj je gumb neklikabilan i zasjenjen. Cvrnei gumb 'ponisti' cijelo je vrijeme klikabilan.

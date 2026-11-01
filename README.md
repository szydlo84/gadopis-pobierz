# Gadopis: pobieranie i strona

**Gadaj, gadopis to zapisze.** Gadopis to darmowa aplikacja do dyktowania po polsku dla Windows 10 i 11. Naciskasz F8, mówisz, a tekst pojawia się tam, gdzie jest kursor: w Wordzie, przeglądarce, ChatGPT czy Discordzie. Rozpoznawanie mowy działa w całości na Twoim komputerze, bez konta i bez chmury.

Strona: **[gadopis.pl](https://gadopis.pl)**

Najnowsza wersja jest w zakładce [Releases](https://github.com/szydlo84/gadopis-pobierz/releases/latest):

- **Gadopis-Setup.exe**: instalator. Wybierasz zwykłą instalację (menu Start, deinstalator, bez uprawnień administratora) albo wersję przenośną. Model mowy pobiera się przy pierwszym uruchomieniu.
- **Gadopis-Portable-Full.zip**: wersja przenośna z modelami. Rozpakuj i uruchom `Gadopis.exe`, działa bez internetu.
- **Gadopis-Portable.zip**: wersja przenośna bez modeli.

Od wersji 0.1.2 Gadopis raz dziennie sprawdza to repozytorium i sam proponuje aktualizację: wystarczy kliknąć „Zaktualizuj do …” na dole okna. Sprawdzanie można wyłączyć w Ustawienia → Prywatność.

To wersja beta i program nie jest jeszcze podpisany certyfikatem. Windows SmartScreen może pokazać ostrzeżenie: kliknij „Więcej informacji”, a potem „Uruchom mimo to”. Sumy kontrolne plików są w `SHA256SUMS.txt`.

Gadopis bazuje na otwartym projekcie [Handy](https://github.com/cjpais/Handy) (licencja MIT). Licencje wszystkich składników są w folderze `LICENSES` w każdej paczce.

Coś nie działa albo masz pomysł? Napisz w zakładce [Issues](https://github.com/szydlo84/gadopis-pobierz/issues).

## Strona gadopis.pl

Folder `site/` to strona wizytówka: HTML, CSS i JavaScript bez bibliotek, ciasteczek i śledzenia. Obraz Docker (`site/Dockerfile`, nginx) buduje i uruchamia Coolify. Licznik pobrań i numer wersji strona odczytuje z wydań tego repozytorium. Przy nowej wersji wystarczy dodać wydanie z plikami o tych samych nazwach, a strony nie trzeba zmieniać. Programy aktualizują się z najnowszego wydania, więc musi ono mieć tag `vX.Y.Z` (bez oznaczenia „pre-release”), plik `Gadopis-Setup.exe` i jego sumę w `SHA256SUMS.txt`. Publicznie widać tylko najnowsze wydanie: starsze są ukryte jako szkice, a ich pobrania dolicza stała `HIDDEN_DOWNLOADS` w `site/app.js`.

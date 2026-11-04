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

## Poradniki

- [Zamiana mowy na tekst po polsku](https://gadopis.pl/zamiana-mowy-na-tekst)
- [Pisanie głosowe na komputerze](https://gadopis.pl/pisanie-glosowe-na-komputerze)
- [Dyktowanie po polsku w Windows 10 i 11](https://gadopis.pl/dyktowanie-windows-10)
- [Dyktowanie w Wordzie po polsku](https://gadopis.pl/dyktowanie-w-wordzie)
- [Programy do dyktowania po polsku](https://gadopis.pl/programy-do-dyktowania)
- [Wispr Flow po polsku](https://gadopis.pl/wispr-flow-po-polsku)
- [Transkrypcja nagrań na tekst](https://gadopis.pl/transkrypcja-nagran)
- [Transkrypcja wywiadu](https://gadopis.pl/transkrypcja-wywiadu)
- [Automatyczne napisy do filmu](https://gadopis.pl/napisy-do-filmu)

## In English

Gadopis is a free offline dictation app for Windows 10 and 11, built with Polish in mind. Press F8, speak, and the text appears at your cursor in any app. It also turns audio and video files into text and .srt subtitles. Speech recognition runs on your computer with Whisper and Parakeet models, so there is no cloud and no account. Polish is the default, and you can choose another language in the settings. More at [gadopis.pl/en](https://gadopis.pl/en).

## Strona gadopis.pl

Folder `site/` to strona wizytówka: HTML, CSS i JavaScript bez bibliotek. Statystyki odwiedzin (Google Analytics 4) włączają się dopiero po zgodzie w banerze. Obraz Docker (`site/Dockerfile`, nginx) buduje i uruchamia Coolify. Licznik pobrań i numer wersji strona odczytuje z wydań tego repozytorium. Przy nowej wersji wystarczy dodać wydanie z plikami o tych samych nazwach, a strony nie trzeba zmieniać. Programy aktualizują się z najnowszego wydania, więc musi ono mieć tag `vX.Y.Z` (bez oznaczenia „pre-release”), plik `Gadopis-Setup.exe` i jego sumę w `SHA256SUMS.txt`. Publicznie widać tylko najnowsze wydanie: starsze są ukryte jako szkice, a ich pobrania dolicza stała `HIDDEN_DOWNLOADS` w `site/app.js`.

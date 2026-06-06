# Bosanski GitHub (GitHub BS) 🇧🇦

<p align="center">
  <img src="icons/icon128.png" width="128" height="128" alt="Bosanski GitHub Logo" />
</p>

**Bosanski GitHub** je zabavna Chrome ekstenzija koja transformiše standardno GitHub sučelje u autentični balkan-style ugođaj. Uz motive ćevapa, rakije, tradicionalnog heklanja (miljea) i nezaobilazne birokratske tematike, pretvorite svoje okruženje za razvoj u pravi domaći šalter!

---

## ✨ Karakteristike (Features)

*   **Dizajn sa stilom**: Tamnoplavi i zlatni akcenti inspirisani motivima sa bosanske zastave, uz upečatljivu pozadinsku dekoraciju heklanog miljea (*crochet doily*) i diskretni vodeni žig zastave u gornjem desnom uglu.
*   **"Do kafe" brojač**: Widget u lijevoj koloni koji precizno prati minute i sate preostale do sljedeće pauze za kaficu (10:00, 13:00, 16:00) uz šaljive bakine savjete.
*   **Balkan Commit Generator**: Generator slučajnih bosanskih commit poruka poput *"proradilo samo od sebe"* ili *"popravio što je Đuro pokvario"*, sa ugrađenom opcijom brzog kopiranja u clipboard.
*   **Birokratska pretraga (Gimmick)**: Pokušaj pretrage vas upozorava da vam fali rodni list (ne stariji od 6 mjeseci) i taksa od 2 KM. Pretragu možete obaviti samo ako kliknete na dugme `💸 Traži preko štele`.
*   **Statusni panel**: Prati vitalne parametre: GitHub status, API status, svježinu Ćevapa i jačinu Rakije.
*   **Domaća lokalizacija**: Sučelje je u potpunosti prevedeno na naš jezik (npr. *Dashboard* ➔ *Nadzorna ploča*, *New* ➔ *Novi belaj*, *relative time* ➔ *prije 3 sata*).

---

## 🛠️ Instalacija (Kako pokrenuti lokalno)

Da biste instalirali ekstenziju na svoj pretraživač, pratite sljedeće korake:

1.  **Klonirajte ili preuzmite ovaj repozitorij**:
    ```bash
    git clone https://github.com/menilvukovic/github-bs.git
    ```
2.  **Otvorite upravljanje ekstenzijama**:
    *   Otvorite Google Chrome (ili bilo koji Chromium pretraživač poput Brave, Edge, Opera).
    *   Idite na adresu: `chrome://extensions/`
3.  **Uključite "Developer mode"**:
    *   Pronađite i uključite prekidač **Developer mode** u gornjem desnom uglu stranice.
4.  **Učitajte ekstenziju**:
    *   Kliknite na dugme **Load unpacked** u gornjem lijevom uglu.
    *   Odaberite cijeli folder `github-bs` koji ste preuzeli.
5.  **Isprobajte**:
    *   Posjetite [github.com](https://github.com/) i prijavite se na svoj račun. Nadzorna ploča bi trebala zasjati u novom, domaćem ruhu!

---

## 🚀 Automatska Objava (CI/CD Pipeline)

Ovaj projekat koristi GitHub Actions za automatsku objavu novih verzija na Chrome Web Store pri svakom push-u na `main` granu.

### 🔑 Potrebne tajne (Repository Secrets)
Da bi automatska objava radila, u postavkama GitHub repozitorija (`Settings` -> `Secrets and variables` -> `Actions`) morate dodati sljedeće tajne:

1.  **`EXTENSION_ID`**: ID vaše ekstenzije na Chrome Web Store Developer konzoli.
2.  **`CLIENT_ID`**: Google API OAuth2 Client ID.
3.  **`CLIENT_SECRET`**: Google API OAuth2 Client Secret.
4.  **`REFRESH_TOKEN`**: OAuth2 Refresh Token za pristup Chrome Web Store API-ju.

Za više informacija o tome kako generisati ove ključeve, pogledajte [službenu dokumentaciju za Chrome Web Store API](https://developer.chrome.com/docs/webstore/using_api/).

---

## 📄 Licenca

Ovaj projekat je otvorenog koda pod MIT licencom — namijenjen entersijastima i ćevapi open-source zajednici!

# RUNBOOK: Dodavanje novog proizvoda (od fotke do objave)

Za Đorđa — vlasnica šalje materijal, ti objavljuješ. ~10 minuta po proizvodu.

## Šta tražiš od vlasnice (pre nego što sedneš)

- [ ] Naziv torte/kolača (npr. „Pistać-limun")
- [ ] Cenu po kilogramu
- [ ] Opis slojeva njenim rečima (2–4 sloja)
- [ ] Fotografije: **ugao + odozgo + PRESEK** (presek je obavezan — validacija u Studiju neće pustiti bez njega)
- [ ] Deklaraciju (ima ih spremne) — sastojci, alergeni, čuvanje, nutritivne vrednosti

## Koraci

1. **Otvori Studio:** `http://localhost:3000/studio` (lokalno) ili `<domen>/studio` (produkcija). Prijavi se svojim Sanity nalogom.
2. **Novi dokument:** klik na „Product" → „+ Create".
3. **Title:** tačan naziv (crtica između ukusa: „Pistać-malina"). **Slug:** klikni „Generate" — proveri da nema slovnih grešaka (istorija pamti „pizdac-malina"!).
4. **Short description:** 1–2 rečenice u njenom glasu (1. lice, senzorski — pogledaj primere u `docs/copy/COPY-DECK-V3.md` §12). Max ~150 znakova.
5. **Full description:** opis slojeva („Slojevi: … , … i …").
6. **Price per kg:** broj bez tačaka (3700, ne 3.700).
7. **Slike:** Image = najlepši ugao · Cross-section image = PRESEK · Gallery = sve ostale (min 1). Svakoj slici popuni **alt** („{Naziv}, presek — Puterina, butik torti Beograd").
8. **Sastav:** ingredients (lista kroz zarez), allergens (čekiraj — NIKAD ne izostavljaj ako sadrži!), nutrition (iz deklaracije, na 100 g), storage, declaration (prepiši deklaraciju u celosti).
9. **Signature?** Čekiraj `isSignature` SAMO za potpisne torte (trenutno: Pistać-malina, Kokos-vanila-malina) — one se prikazuju krupnije i na naslovnoj.
10. **Publish** (plavo dugme). Sajt se osvežava sam u roku od 60 sekundi (`revalidate = 60`). Proveri stranicu `/proizvod/<slug>` i katalog.

## Napomene

- **Dummy proizvodi za pregled** imaju ID prefiks `dummy-product-*` — kada stignu pravi podaci, obriši ih u Studiju (Document → Delete) i isprazni `lib/dummy-data.ts` katalog.
- Dok je `lib/products.ts` merge aktivan, **naslov/opis sa sajta dolazi iz `lib/dummy-data.ts`** za slugove koji tamo postoje, a iz Sanity-ja cena. Za V3 (pravi podaci) merge se okreće u korist Sanity-ja — vidi TODO u `lib/products.ts`.
- Uklanjanje proizvoda iz ponude: unpublish u Studiju (ne briši — sezonski se vraćaju).

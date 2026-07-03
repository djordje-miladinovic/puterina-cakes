import { type AllergenKey } from "@/lib/dummy-data"

/**
 * Alergeni (PLAN T4.2, bezbednosna korekcija): uvek "Sadrži:" + obične
 * oznake BEZ precrtavanja — precrtano bi značilo da alergena NEMA,
 * što je opasno pogrešna zdravstvena poruka.
 */
const ALLERGEN_LABELS: Record<AllergenKey, string> = {
  gluten: "Gluten",
  eggs: "Jaja",
  milk: "Mleko",
  nuts: "Orašasti plodovi",
}

export default function AllergenList({
  allergens,
  note,
}: {
  allergens: AllergenKey[]
  note?: string
}) {
  if (allergens.length === 0 && !note) {
    return (
      <p className="body-small text-charcoal/70">
        Informacije o alergenima na upit.
      </p>
    )
  }

  return (
    <div>
      {allergens.length > 0 && (
        <p className="body">
          <span className="font-semibold text-warm-brown">Sadrži: </span>
          <span className="text-charcoal/85">
            {allergens.map((a) => ALLERGEN_LABELS[a]).join(", ")}
          </span>
        </p>
      )}
      {note && <p className="body-small mt-2 text-charcoal/70">{note}</p>}
    </div>
  )
}

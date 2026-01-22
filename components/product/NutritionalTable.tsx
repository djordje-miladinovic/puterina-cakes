interface NutritionData {
  energy: number
  fat: number
  saturatedFat?: number
  carbs: number
  sugars?: number
  protein: number
  fiber?: number
  salt: number
}

interface NutritionalTableProps {
  nutrition: NutritionData
}

export default function NutritionalTable({ nutrition }: NutritionalTableProps) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border">
          <th className="py-3 text-left font-semibold text-foreground">
            Nutritivna vrednost
          </th>
          <th className="py-3 text-right font-semibold text-foreground">
            Per 100g
          </th>
        </tr>
      </thead>
      <tbody className="text-muted-foreground">
        <tr className="border-b border-border/50">
          <td className="py-3">Energetska vrednost</td>
          <td className="py-3 text-right">{nutrition.energy} kcal</td>
        </tr>
        <tr className="border-b border-border/50">
          <td className="py-3">Masti</td>
          <td className="py-3 text-right">{nutrition.fat}g</td>
        </tr>
        {nutrition.saturatedFat !== undefined && (
          <tr className="border-b border-border/50">
            <td className="py-3 pl-4 text-sm">od čega zasićene</td>
            <td className="py-3 text-right">{nutrition.saturatedFat}g</td>
          </tr>
        )}
        <tr className="border-b border-border/50">
          <td className="py-3">Ugljeni hidrati</td>
          <td className="py-3 text-right">{nutrition.carbs}g</td>
        </tr>
        {nutrition.sugars !== undefined && (
          <tr className="border-b border-border/50">
            <td className="py-3 pl-4 text-sm">od čega šećeri</td>
            <td className="py-3 text-right">{nutrition.sugars}g</td>
          </tr>
        )}
        <tr className="border-b border-border/50">
          <td className="py-3">Proteini</td>
          <td className="py-3 text-right">{nutrition.protein}g</td>
        </tr>
        {nutrition.fiber !== undefined && (
          <tr className="border-b border-border/50">
            <td className="py-3">Vlakna</td>
            <td className="py-3 text-right">{nutrition.fiber}g</td>
          </tr>
        )}
        <tr>
          <td className="py-3">So</td>
          <td className="py-3 text-right">{nutrition.salt}g</td>
        </tr>
      </tbody>
    </table>
  )
}

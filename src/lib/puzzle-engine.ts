import { categories, puzzleRules } from "@/data/demo-data";
import type {
  Activity,
  CategoryKey,
  Hotel,
  PuzzleRequirement,
  PuzzleResult,
} from "@/types/domain";

interface ComputeInput {
  hotel: Hotel;
  selectedActivityIds: string[];
  activities: Activity[];
  travelers: number;
  nights?: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function uniqueCategoryKeys(items: Activity[]) {
  return [...new Set(items.map((item) => item.categoryKey))];
}

export function computePuzzleProgress({
  hotel,
  selectedActivityIds,
  activities,
  travelers,
  nights = hotel.nightsIncluded,
}: ComputeInput): PuzzleResult {
  const selectedActivities = activities.filter((activity) =>
    selectedActivityIds.includes(activity.id),
  );

  const essentials = selectedActivities.filter(
    (activity) => activity.categoryKey === "ESSENTIALS",
  );
  const uniqueCategories = uniqueCategoryKeys(selectedActivities);
  const contributionTotal = selectedActivities.reduce(
    (sum, activity) => sum + activity.puzzleContribution,
    0,
  );
  const totalClientAmount =
    selectedActivities.reduce(
      (sum, activity) => sum + activity.pricePerTraveler * travelers,
      0,
    ) || 0;
  const activityInternalCost =
    selectedActivities.reduce(
      (sum, activity) => sum + activity.supplierCostPerTraveler * travelers,
      0,
    ) || 0;
  const hotelInternalCost = hotel.internalNightlyCost * nights;
  const grossMargin = totalClientAmount - activityInternalCost - hotelInternalCost;
  const marginRate = totalClientAmount > 0 ? grossMargin / totalClientAmount : 0;

  const essentialsScore =
    clamp(essentials.length / puzzleRules.minEssentialSelections, 0, 1) * 25;
  const categoriesScore =
    clamp(uniqueCategories.length / categories.length, 0, 1) *
    puzzleRules.categoryWeight;
  const contributionScore = clamp(
    contributionTotal,
    0,
    puzzleRules.contributionWeight,
  );
  const financialScore =
    clamp(totalClientAmount / puzzleRules.minCartAmount, 0, 1) *
      (puzzleRules.financialWeight * 0.6) +
    clamp(marginRate / puzzleRules.minMarginRate, 0, 1) *
      (puzzleRules.financialWeight * 0.4);
  const availabilityScore =
    selectedActivities.length >= puzzleRules.minActivities
      ? puzzleRules.availabilityWeight
      : clamp(
          selectedActivities.length / puzzleRules.minActivities,
          0,
          1,
        ) * puzzleRules.availabilityWeight;

  const progress = Math.round(
    clamp(
      essentialsScore +
        categoriesScore +
        contributionScore +
        financialScore +
        availabilityScore,
      0,
      puzzleRules.unlockThreshold,
    ),
  );

  const requirements: PuzzleRequirement[] = [
    {
      id: "essentials",
      label: "Services essentiels selectionnes",
      current: essentials.length,
      target: puzzleRules.minEssentialSelections,
      satisfied: essentials.length >= puzzleRules.minEssentialSelections,
      visibleToCustomer: true,
    },
    {
      id: "activities",
      label: "Experiences totales selectionnees",
      current: selectedActivities.length,
      target: puzzleRules.minActivities,
      satisfied: selectedActivities.length >= puzzleRules.minActivities,
      visibleToCustomer: true,
    },
    {
      id: "cart",
      label: "Panier minimum",
      current: totalClientAmount,
      target: puzzleRules.minCartAmount,
      satisfied: totalClientAmount >= puzzleRules.minCartAmount,
      visibleToCustomer: false,
    },
    {
      id: "margin",
      label: "Marge minimum",
      current: marginRate,
      target: puzzleRules.minMarginRate,
      satisfied: marginRate >= puzzleRules.minMarginRate,
      visibleToCustomer: false,
    },
  ];

  const unlocked =
    progress >= puzzleRules.unlockThreshold &&
    requirements.every((requirement) => requirement.satisfied);

  const remainingCategories = categories
    .map((category) => category.key)
    .filter((key) => !uniqueCategories.includes(key));

  let statusLabel = "Hebergement en cours de debloquage";
  let statusMessage = "Ajoutez encore quelques experiences pour atteindre 100%.";

  if (unlocked) {
    statusLabel = "Hebergement debloque";
    statusMessage =
      "Felicitations, votre Bonus Stay est valide et l'hebergement est offert.";
  } else if (essentials.length < puzzleRules.minEssentialSelections) {
    statusMessage =
      "Commencez par renforcer votre sejour avec les services essentiels obligatoires.";
  } else if (selectedActivities.length < puzzleRules.minActivities) {
    statusMessage =
      "Ajoutez au moins une experience supplementaire pour renforcer votre progression.";
  }

  return {
    selectedIds: selectedActivityIds,
    selectedActivities,
    progress,
    unlocked,
    statusLabel,
    statusMessage,
    totalClientAmount,
    remainingCategories,
    completedCategories: uniqueCategories,
    requirements,
    internal: {
      hotelInternalCost,
      activityInternalCost,
      grossMargin,
      marginRate,
      contributionScore,
    },
  };
}

export function customerSafePuzzleView(result: PuzzleResult) {
  return {
    progress: result.progress,
    unlocked: result.unlocked,
    statusLabel: result.statusLabel,
    statusMessage: result.statusMessage,
    totalClientAmount: result.totalClientAmount,
    completedCategories: result.completedCategories,
    visibleRequirements: result.requirements.filter(
      (requirement) => requirement.visibleToCustomer,
    ),
  };
}

export function buildDefaultSelection(
  activities: Activity[],
  categoryKeys: CategoryKey[],
) {
  return categoryKeys
    .map((key) => activities.find((activity) => activity.categoryKey === key)?.id)
    .filter((value): value is string => Boolean(value));
}

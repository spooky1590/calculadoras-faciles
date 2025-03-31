import { categories } from '../data/categories';

export interface Calculator {
  title: string;
  description: string;
  href: string;
}

export function getRelatedCalculators(currentHref: string, maxResults: number = 3): Calculator[] {
  // Find the category containing the current calculator
  const currentCategory = categories.find(category =>
    category.calculators.some(calc => calc.href === currentHref)
  );

  if (!currentCategory) {
    return [];
  }

  // Get all calculators from the same category, excluding the current one
  const relatedCalculators = currentCategory.calculators.filter(
    calc => calc.href !== currentHref
  );

  // Randomly select up to maxResults calculators
  const shuffled = [...relatedCalculators].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, maxResults);
}
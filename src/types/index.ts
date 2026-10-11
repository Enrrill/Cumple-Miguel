/** Estados posibles del Starr Drop, de menor a mayor rareza. */
export type StarrStage = 0 | 1 | 2 | 3;

/** Configuración visual de cada rareza del Starr Drop. */
export interface StarrRarity {
  label: string;
  badgeClass: string;
  glowClass: string;
  hint: string;
}

// cut

export type TCoordinate = {
  type?: string;
  datum?: string;//
  condition?: string;
  description?: string;
}

// cut 

export type TMagnitude = {
  type: string;
  condition: string;
  description: string;
  $t: string;
}

export type TTsunamiHeight = {
  type: string;
  unit: string;
  condition: string;
  description: string;
  $t: string;
}

export type TProbabilityOfAfterShock = {
  type: string;
  unit: string;
  $t: string;
}

// cut
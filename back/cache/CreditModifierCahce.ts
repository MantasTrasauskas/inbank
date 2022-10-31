class CreditModifierCache {
  getCreditModifier(personalNumber: number): number {
    return this.getCreditModifierMap()[personalNumber];
  }

  private getCreditModifierMap(): CreditModifierMap {
    return {
      49002010965: 0,
      49002010976: 100,
      49002010987: 300,
      49002010998: 1000,
    };
  }
}

interface CreditModifierMap {
  [key: number]: number;
}

export = CreditModifierCache;

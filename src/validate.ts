export default class Validate {
  rules: any;
  constructor() {
    this.rules = [];
  }

  max(length: number) {
    this.rules.push({
      check: (value: string): boolean => value.length <= length,
      message: (fieldName: string): string =>
        `${fieldName} должен содержать не более ${length} символов`,
    });
    return this;
  }

  min(length: number) {
    this.rules.push({
      check: (value: string): boolean => value.length >= length,
      message: (fieldName: string): string =>
        `${fieldName} должен содержать не менее ${length} символов`,
    });
    return this;
  }

  regex(pattern: string | RegExp) {
    const regular = new RegExp(pattern);
    this.rules.push({
      check: (value: string): boolean => regular.test(value),
      message: (fieldName: string): string =>
        `${fieldName} содержит допустимые символы`,
    });
    return this;
  }

  execute(
    value: string,
    fieldName = "Значение"
  ): { isValid: boolean[]; errorMessage: string[] } {
    let result = this.rules.map(
      (rule: {
        check: (value: string) => boolean;
        message: (fieldName: string) => string;
      }) => ({
        isValid: rule.check(value),
        error: rule.message(fieldName),
      })
    );

    return {
      isValid: result.map((r: { isValid: any }) => r.isValid),
      errorMessage: result.map((r: { error: any }) => r.error),
    };
  }
}

export const includesAll = (objKeys: string[], params: string[]): boolean => params.every((param) => objKeys.includes(param));

export const includesSome = (objKeys: string[], params: string[]): boolean => params.some((param) => objKeys.includes(param));
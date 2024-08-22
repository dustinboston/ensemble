export type SupportedJsTypes =
	| boolean
	| null
	| number
	| string
	| undefined
	| Error
	| Array<SupportedJsTypes>
	| Map<SupportedJsTypes, SupportedJsTypes>
	| Set<SupportedJsTypes>
	| ((...args: SupportedJsTypes[]) => SupportedJsTypes);

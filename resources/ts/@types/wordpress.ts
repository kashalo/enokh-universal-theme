declare let wp: object;



interface WPBlock< Attributes = Object > {
    readonly clientId: string;
    readonly name: string;
    readonly isValid: boolean;
    readonly attributes: Attributes;
}

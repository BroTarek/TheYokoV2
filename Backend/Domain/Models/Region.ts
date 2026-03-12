
export class Region {
    private _id: string = '';
    private _name: string = '';
    private _code: string = '';

    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }

    get name(): string { return this._name; }
    set name(value: string) { this._name = value; }

    get code(): string { return this._code; }
    set code(value: string) { this._code = value; }

    constructor(data?: Partial<Region>) {
        if (data) {
            this._id = data.id ?? this._id;
            this._name = data.name ?? this._name;
            this._code = data.code ?? this._code;
        }
    }
}
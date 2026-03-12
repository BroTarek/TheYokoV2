export class ReferralSource {
    private _id: string = '';
    private _name: string = '';
    private _is_active: boolean = true;

    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }

    get name(): string { return this._name; }
    set name(value: string) { this._name = value; }

    get is_active(): boolean { return this._is_active; }
    set is_active(value: boolean) { this._is_active = value; }

    constructor(data?: Partial<ReferralSource>) {
        if (data) {
            this._id = data.id ?? this._id;
            this._name = data.name ?? this._name;
            this._is_active = data.is_active ?? this._is_active;
        }
    }
}
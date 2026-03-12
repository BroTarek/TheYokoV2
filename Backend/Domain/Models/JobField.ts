

export class JobField {
    private _id: string = '';
    private _name: string = '';

    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }

    get name(): string { return this._name; }
    set name(value: string) { this._name = value; }

    constructor(data?: Partial<JobField>) {
        if (data) {
            this._id = data.id ?? this._id;
            this._name = data.name ?? this._name;
        }
    }
}
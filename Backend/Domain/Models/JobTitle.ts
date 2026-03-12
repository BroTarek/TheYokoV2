import { JobField } from "./JobField";

export class JobTitle {
    private _id: string = '';
    private _title: string = '';
    private _field: JobField = new JobField();

    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }

    get title(): string { return this._title; }
    set title(value: string) { this._title = value; }

    get field(): JobField { return this._field; }
    set field(value: JobField) { this._field = value; }

    constructor(data?: Partial<JobTitle>) {
        if (data) {
            this._id = data.id ?? this._id;
            this._title = data.title ?? this._title;
            this._field = data.field ?? this._field;
        }
    }
}
import { JobField } from "./JobField";
import { JobRequirement } from "./JobRequirement";

export class Company {
    private _id: string = '';
    private _name: string = '';
    private _description: string = '';
    private _is_archived: boolean = false;
    private _created_at: Date = new Date();
    private _fields: JobField[] = [];
    private _jobRequirements: JobRequirement[] = [];

    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }

    get name(): string { return this._name; }
    set name(value: string) { this._name = value; }

    get description(): string { return this._description; }
    set description(value: string) { this._description = value; }

    get is_archived(): boolean { return this._is_archived; }
    set is_archived(value: boolean) { this._is_archived = value; }

    get created_at(): Date { return this._created_at; }
    set created_at(value: Date) { this._created_at = value; }

    get fields(): JobField[] { return this._fields; }
    set fields(value: JobField[]) { this._fields = value; }

    get jobRequirements(): JobRequirement[] { return this._jobRequirements; }
    set jobRequirements(value: JobRequirement[]) { this._jobRequirements = value; }

    constructor(data?: Partial<Company>) {
        if (data) {
            this._id = data.id ?? this._id;
            this._name = data.name ?? this._name;
            this._description = data.description ?? this._description;
            this._is_archived = data.is_archived ?? this._is_archived;
            this._created_at = data.created_at ?? this._created_at;
            this._fields = data.fields ?? this._fields;
            this._jobRequirements = data.jobRequirements ?? this._jobRequirements;
        }
    }
}

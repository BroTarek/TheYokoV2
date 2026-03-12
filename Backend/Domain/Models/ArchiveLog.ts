import { EntityType } from "./Enums";

export class ArchiveLog {
    private _id: string = '';
    private _entityType: EntityType = EntityType.APPLICANT;
    private _entityId: string = '';
    private _archived_at: Date = new Date();
    private _archived_by: string = '';

    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }

    get entityType(): EntityType { return this._entityType; }
    set entityType(value: EntityType) { this._entityType = value; }

    get entityId(): string { return this._entityId; }
    set entityId(value: string) { this._entityId = value; }

    get archived_at(): Date { return this._archived_at; }
    set archived_at(value: Date) { this._archived_at = value; }

    get archived_by(): string { return this._archived_by; }
    set archived_by(value: string) { this._archived_by = value; }

    constructor(data?: Partial<ArchiveLog>) {
        if (data) {
            this._id = data.id ?? this._id;
            this._entityType = data.entityType ?? this._entityType;
            this._entityId = data.entityId ?? this._entityId;
            this._archived_at = data.archived_at ?? this._archived_at;
            this._archived_by = data.archived_by ?? this._archived_by;
        }
    }
}

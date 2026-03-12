import { ApplicantStatus, YearsOfExperience } from "./Enums";
import { JobField } from "./JobField";
import { JobTitle } from "./JobTitle";
import { ReferralSource } from "./ReferralSource";
import { Region } from "./Region";

export class Applicant {
    private _id: string = '';
    private _first_name: string = '';
    private _last_name: string = '';
    private _phone: string = '';
    private _email: string = '';
    private _years_of_experience: YearsOfExperience = YearsOfExperience.ZERO_TO_FIVE;
    private _jobTitle: JobTitle = new JobTitle();
    private _jobField: JobField = new JobField();
    private _referralSource: ReferralSource = new ReferralSource();
    private _status: ApplicantStatus = ApplicantStatus.UNSEEN;
    private _regions: Region[] = [];
    private _experience_description: string = '';
    private _google_drive_url: string = '';
    private _last_company: string = '';
    private _application_date: Date = new Date();
    private _created_at: Date = new Date();
    private _updated_at: Date = new Date();
    private _is_archived: boolean = false;

    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }

    get first_name(): string { return this._first_name; }
    set first_name(value: string) { this._first_name = value; }

    get last_name(): string { return this._last_name; }
    set last_name(value: string) { this._last_name = value; }

    get phone(): string { return this._phone; }
    set phone(value: string) { this._phone = value; }

    get email(): string { return this._email; }
    set email(value: string) { this._email = value; }

    get years_of_experience(): YearsOfExperience { return this._years_of_experience; }
    set years_of_experience(value: YearsOfExperience) { this._years_of_experience = value; }

    get jobTitle(): JobTitle { return this._jobTitle; }
    set jobTitle(value: JobTitle) { this._jobTitle = value; }

    get jobField(): JobField { return this._jobField; }
    set jobField(value: JobField) { this._jobField = value; }

    get referralSource(): ReferralSource { return this._referralSource; }
    set referralSource(value: ReferralSource) { this._referralSource = value; }

    get status(): ApplicantStatus { return this._status; }
    set status(value: ApplicantStatus) { this._status = value; }

    get regions(): Region[] { return this._regions; }
    set regions(value: Region[]) { this._regions = value; }

    get experience_description(): string { return this._experience_description; }
    set experience_description(value: string) { this._experience_description = value; }

    get google_drive_url(): string { return this._google_drive_url; }
    set google_drive_url(value: string) { this._google_drive_url = value; }

    get last_company(): string { return this._last_company; }
    set last_company(value: string) { this._last_company = value; }

    get application_date(): Date { return this._application_date; }
    set application_date(value: Date) { this._application_date = value; }

    get created_at(): Date { return this._created_at; }
    set created_at(value: Date) { this._created_at = value; }

    get updated_at(): Date { return this._updated_at; }
    set updated_at(value: Date) { this._updated_at = value; }

    get is_archived(): boolean { return this._is_archived; }
    set is_archived(value: boolean) { this._is_archived = value; }

    constructor(data?: Partial<Applicant>) {
        if (data) {
            this._id = data.id ?? this._id;
            this._first_name = data.first_name ?? this._first_name;
            this._last_name = data.last_name ?? this._last_name;
            this._phone = data.phone ?? this._phone;
            this._email = data.email ?? this._email;
            this._years_of_experience = data.years_of_experience ?? this._years_of_experience;
            this._jobTitle = data.jobTitle ?? this._jobTitle;
            this._jobField = data.jobField ?? this._jobField;
            this._referralSource = data.referralSource ?? this._referralSource;
            this._status = data.status ?? this._status;
            this._regions = data.regions ?? this._regions;
            this._experience_description = data.experience_description ?? this._experience_description;
            this._google_drive_url = data.google_drive_url ?? this._google_drive_url;
            this._last_company = data.last_company ?? this._last_company;
            this._application_date = data.application_date ?? this._application_date;
            this._created_at = data.created_at ?? this._created_at;
            this._updated_at = data.updated_at ?? this._updated_at;
            this._is_archived = data.is_archived ?? this._is_archived;
        }
    }
}
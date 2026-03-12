import { Company } from "./Company";
import { JobNature, YearsOfExperience } from "./Enums";
import { JobField } from "./JobField";
import { JobTitle } from "./JobTitle";
import { Region } from "./Region";
import {Applicant} from "./Applicant"
export class JobRequirement {
    private _id: string = '';
    private _company: Company = new Company();
    private _jobTitle: JobTitle = new JobTitle();
    private _field: JobField = new JobField();
    private _yearsOfExperience: YearsOfExperience = YearsOfExperience.ZERO_TO_FIVE;
    private _jobNature: JobNature = JobNature.FULL_TIME;
    private _desiredRegions: Region[] = [];
    private _numberOfApplicantsNeeded: number = 0;
    private _numberOfApplicantsSelected: number = 0;
    private _created_at: Date = new Date();
    private _selectedApplicants=new Array<Applicant>();
    
    set selectedApplicants(value: Applicant[]) { this._selectedApplicants = value; }
    get selectedApplicants(): Applicant[] { return this._selectedApplicants; }

    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }

    get company(): Company { return this._company; }
    set company(value: Company) { this._company = value; }

    get jobTitle(): JobTitle { return this._jobTitle; }
    set jobTitle(value: JobTitle) { this._jobTitle = value; }


    get jobField(): JobField { return this._field; }
    set jobField(value: JobField) { this._field = value; }

    get yearsOfExperience(): YearsOfExperience { return this._yearsOfExperience; }
    set yearsOfExperience(value: YearsOfExperience) { this._yearsOfExperience = value; }

    get jobNature(): JobNature { return this._jobNature; }
    set jobNature(value: JobNature) { this._jobNature = value; }

    get desiredRegions(): Region[] { return this._desiredRegions; }
    set desiredRegions(value: Region[]) { this._desiredRegions = value; }

    get numberOfApplicantsNeeded(): number { return this._numberOfApplicantsNeeded; }
    set numberOfApplicantsNeeded(value: number) { this._numberOfApplicantsNeeded = value; }

    get numberOfApplicantsSelected(): number { return this._numberOfApplicantsSelected; }
    set numberOfApplicantsSelected(value: number) { this._numberOfApplicantsSelected = value; }

    get created_at(): Date { return this._created_at; }
    set created_at(value: Date) { this._created_at = value; }

    constructor(data?: Partial<JobRequirement>) {
        if (data) {
            this._id = data.id ?? this._id;
            this._company = data.company ?? this._company;
            this._jobTitle = data.jobTitle ?? this._jobTitle;
            this._yearsOfExperience = data.yearsOfExperience ?? this._yearsOfExperience;
            this._jobNature = data.jobNature ?? this._jobNature;
            this._desiredRegions = data.desiredRegions ?? this._desiredRegions;
            this._numberOfApplicantsNeeded = data.numberOfApplicantsNeeded ?? this._numberOfApplicantsNeeded;
            this._numberOfApplicantsSelected = data.numberOfApplicantsSelected ?? this._numberOfApplicantsSelected;
            this._created_at = data.created_at ?? this._created_at;
            this._selectedApplicants = data.selectedApplicants ?? this._selectedApplicants;
        }
    }
}
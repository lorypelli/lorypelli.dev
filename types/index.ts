export interface GithubRepo {
    archived: boolean;
    created_at: string;
    fork: boolean;
    forks_count: number;
    html_url: string;
    language?: string;
    name: string;
    stargazers_count: number;
}

export enum UnitName {
    YEARS = 'years',
    MONTHS = 'months',
    WEEKS = 'weeks',
    DAYS = 'days',
    HOURS = 'hours',
    MINUTES = 'minutes',
    SECONDS = 'seconds',
}

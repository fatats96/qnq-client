export interface Profile {
    s_hash: string;
    sid: string;
    sub: string;
    auth_time: number;
    idp: string;
    amr: string[];
    email: string;
    given_name: string;
}

export interface AuthObject {
    id_token: string;
    session_state: string;
    access_token: string;
    refresh_token: string;
    token_type: string;
    scope: string;
    profile: Profile;
    expires_at: number;
}

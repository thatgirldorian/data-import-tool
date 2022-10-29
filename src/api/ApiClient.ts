//export to types.ts later
type AuthTokenResponse = {
    accessToken: string;
};

type DataStore = {
    id: number;
    name: string;
    tables: DataSourceTable[];
};

type DataSourceTable = {
    id: number;
    title: string;
    isIndented: boolean;
    
};


export class ApiClient {
        authEmail = "applicant@airboxr.com";
        authPassword = "ZUSrS5jSZDvEPTyX";
        authUrl = "https://api.airboxr.com/auth/loginWithEmail";
        dataStoresUrl = "https://api.airboxr.com/data/dataStores";
    
        async getDataStores(): Promise<DataStore[]> {
        const token = await this.getAuthToken();
        console.log(token);
    
        const sources = await fetch(this.dataStoresUrl, {
            method: "GET",
            headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.accessToken
            })
        }).then((res) => res.json());
    
        return sources.map((source: { id: any; name: any; tables: { id: any; title: any; }[]; }) => ({
            id: source.id,
            name: source.name,
            tables: source.tables.map(({ id, title }) => ({
            id,
            title,
            isIndented: this.isIndented(title)

            
            }))
        }));
        }
    
        async getAuthToken(): Promise<AuthTokenResponse> {
            
        return fetch(this.authUrl, {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            email: this.authEmail,
            password: this.authPassword
            })
        }).then((res) => res.json());
        }
    
        isIndented(title: string) {
        return title.includes("||");
        }
    }
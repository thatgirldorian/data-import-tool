import { AuthTokenResponse, DataStore} from '../types'


export class ApiClient {
        authUrl = "https://api.airboxr.com/auth/loginWithEmail";
        authPassword = "ZUSrS5jSZDvEPTyX";
        authEmail = "applicant@airboxr.com";
        dataStoresUrl = "https://api.airboxr.com/data/dataStores";
    
        async getDataStores(): Promise<DataStore[]> {
            const token = await this.getAuthToken();
        
            const response = await fetch(this.dataStoresUrl, {
                method: "GET",
                headers: new Headers({
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token.accessToken
                })
            })
            const sources = await response.json();
        
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
        }).then((res) => res.json()).catch((err) => console.error(err));
        }
    
        isIndented(title: string) {
        return title.includes("||");
        }
    }
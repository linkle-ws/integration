import axios from 'axios';

export default class LinkleWS {
    constructor(apikey) {
        this.apikey = apikey
        this.baseUri = {
            candidatesByDate: 'https://linkle-ws-dev.herokuapp.com/candidatesByCompany/'
        }
    }

    async candidatesByDate(date) {
        const response = await axios({
            headers: { apikey: this.apikey },
            url: `${this.baseUri.candidatesByDate}${date}`
        })

        return response.data
    }
}
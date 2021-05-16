import axios from 'axios';

export default class LinkleWS {
    constructor(apikey) {
        this.apikey = apikey
        this.baseUri = {
            candidatesByDate: 'https://linkle-ws-dev.herokuapp.com/candidatesByCompany/',
            promocodeByContact: 'https://linkle-ws-dev.herokuapp.com/promocode?',
            newPromocode: 'https://linkle-ws-dev.herokuapp.com/promocode/',
            updateCandidate: 'https://linkle-ws-dev.herokuapp.com/applyStatus/'
        }
    }

    async candidatesByDate(date) {
        const response = await axios({
            method: 'GET',
            headers: { apikey: this.apikey },
            url: `${this.baseUri.candidatesByDate}${date}`
        })

        return response.data
    }

    async promocodeByContact(search) {

        const searchMethod = search.includes('@') ? `email=${search}` : `phone=${search}`

        const response = await axios({
            method: 'GET',
            headers: { apikey: this.apikey },
            url: `${this.baseUri.promocodeByContact}${searchMethod}`
        })

        return await response.data
    }

    async newPromocode(promocode, completeName, phone, email) {

        if (!phone && !email) {
            return {
                mensagem: "E-mail ou Telefone são obrigatórios, acesse nossa documentação"
            }
        }

        const requestObject = {
            promocode: promocode,
            completeName: completeName,
        }

        phone ? requestObject.phone = phone : ''
        email ? requestObject.email = email : ''

        const response = await axios({
            method: 'POST',
            headers: { apikey: this.apikey },
            url: `${this.baseUri.newPromocode}`,
            data: requestObject
        })

        return await response.data
    }

    async updateCandidate(applyId, isRejected) {
        const requestObject = {
            applyId, 
            approved: isRejected
        }

        const response = await axios({
            method: 'PATCH',
            headers: { apikey: this.apikey },
            url: `${this.baseUri.updateCandidate}`,
            data: requestObject
        })

        return {
            mensagem: 'Aplicação atualizada com sucesso'
        }
    }
}

module.exports = LinkleWS;
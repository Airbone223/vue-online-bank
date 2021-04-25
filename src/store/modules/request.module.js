import axios from '../../axios/request'
import store from '../index'

export default {
    namespaced: true,
    state() {
        return {
            requests: [],
            messages: []
        }
    },
    getters: {
        requests(state) {
            return state.requests
        },
        messages(state) {
            return state.messages
        }
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests
        },
        addRequest(state, request) {
            state.requests.push(request)
        },
        addMessage(state, message) {
            state.messages.push(message)
        },
        removeMessage(state, id) {
            state.messages = state.messages.filter(msg => msg.id !== id)
        }
        ,
        setMessages(state, messages) {
            state.messages = messages
        }
    },
    actions: {
        async create({commit, dispatch}, payload) {
            try {
                const {data} = await axios.post(`/requests.json`, payload)
                const message = {
                    fio: payload.fio
                }
                const messageData = await axios.post(`/messages.json`, message)
                commit('addMessage', {...message, id: messageData.data.name})
                commit('addRequest', {...payload, id: data.name})
                dispatch('setMessage', {
                    value: 'Заявка успешно создана',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async load({commit, dispatch}) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/requests.json?auth=${token}`)
                const requests = Object.keys(data).map(key => ({id: key, ...data[key]}))
                commit('setRequests', requests)
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async loadMessages({commit}) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/messages.json?auth=${token}`)
                const messages = Object.keys(data).map(key => ({id: key, ...data[key]}))
                commit('setMessages', messages)
            } catch (e) {

            }
        },
        async loadById({dispatch}, id) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/requests/${id}.json?auth=${token}`)
                return data
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async remove({dispatch}, id) {
            try {
                const token = store.getters['auth/token']
                await axios.delete(`/requests/${id}.json?auth=${token}`)
                dispatch('setMessage', {
                    value: 'Заявка удалена.',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async removeMsg({commit},id) {
            try {
                console.log("req", id)
                const token = store.getters['auth/token']
                await axios.delete(`/messages/${id}.json?auth=${token}`)
                commit('removeMessage', id)
            } catch (e) {
            }
        },
        async update({dispatch}, request) {
            try {
                const token = store.getters['auth/token']
                await axios.put(`/requests/${request.id}.json?auth=${token}`, request)
                dispatch('setMessage', {
                    value: 'Заявка обновлена.',
                    type: 'primary'
                }, {root: true})

            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        }
    }
}

import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    //In state we are keeping the data we share with the components
    state:{
        meetups:[],
        categories:[],
        threads:[],
        meetup:[]

    },
    // Are computed properties, simple functions we use to get the state
    getters:{
        meetups(state){
            return state.meetups
        },
        categories(state){
            return state.categories
        },
        meetup(state){
            return state.meetup
        },
        threads(state){
            return state.threads
        }
    },
    // Actions are like methods in componentes. They should not mutate the state
    // Very good spot to fetch a data. Action call usually resolve into data
    actions:{
        fetchMeetups(context){
            axios.get('/api/v1/meetups')
            .then(res=>{
                const meetups = res.data;
                context.commit('setMeetups',meetups);
                return context.state.meetups
            })
        },
        fetchCategories(context){
            axios.get('/api/v1/categories')
            .then(res => {          
                const categories = res.categories;
                context.commit('setCategories',categories);
                return context.state.categories
            })
        },
        fetchMeetupById(context,meetupId){
            //En este caso tenemos que ver lo que ocurre en la funcion definida en el servidor. Pasamos como parametro con el signo ?
            axios.get(`/api/v1/meetups/${meetupId}`)
            .then(res=>{
                const meetup=res.data
                context.commit('setMeetup',meetup);
                return context.state.meetup
            })
        },
        fetchThreads(context, meetupId){
            //En este caso tenemos que ver lo que ocurre en la funcion definida en el servidor. Pasamos como parametro con el signo ?
            axios.get(`/api/v1/threads?meetupId=${meetupId}`)
                .then(res=>{
                    const threads=res.data
                    context.commit('setThreads',threads);
                    return context.state.threads
                })
        }
    },
    //Simple functions to mutate the state
    mutations:{
        setMeetups(state, meetups){
            state.meetups=meetups
        },
        setCategories(state, categories){
            state.categories=categories
        },
        setMeetup(state, meetup){
            state.meetup=meetup
        },
        setThreads(state, threads){
            state.threads=threads
        }
    }
})
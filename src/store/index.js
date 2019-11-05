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
        testingGetter(){
            return 55
        },
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

            context.commit('setItems',{resource:'meetups',items:[]});
            axios.get('/api/v1/meetups')
            .then(res=>{
                const meetups = res.data;
                // context.commit('setMeetups',meetups);
                context.commit('setItems',{resource:'meetups',items:meetups});
                return context.state.meetups
            })
        },
        fetchCategories(context){
            axios.get('/api/v1/categories')
            .then(res => {          
                const categories = res.categories;
                // context.commit('setCategories',categories);
                context.commit('setItems',{resource:'categories',items:categories});
                return context.state.categories
            })
        },
        fetchMeetupById(context,meetupId){
            // MEJORA
            //Cuando cargamos una página de detalle después de haber cargado antes otra en algun momento,
            //por unos segundos se muestran los datos de la anterior meetup, hasta que se fecthean los nuevos y se cargan
            //Por eso, cuando se hace la llamada, vamos a eliminar o cargar datos vacíos hasta que se complete la carga de los nuevos

            context.commit('setItem',{resource:'meetup',item:{}});

            //En este caso tenemos que ver lo que ocurre en la funcion definida en el servidor. Pasamos como parametro con el signo ?
            axios.get(`/api/v1/meetups/${meetupId}`)
            .then(res=>{                
                const meetup=res.data
                // context.commit('setMeetup',meetup);
                context.commit('setItem',{resource:'meetup',item:meetup});
                return context.state.meetup
            })
        },
        fetchThreads(context, meetupId){

            //Inicializamos los threads para que no se carguen los de la vez anterior hasta que se cargan los nuevos
            context.commit('setItems',{resource:'threads',items:{}});

            //En este caso tenemos que ver lo que ocurre en la funcion definida en el servidor. Pasamos como parametro con el signo ?
            axios.get(`/api/v1/threads?meetupId=${meetupId}`)
                .then(res=>{
                    const threads=res.data
                    // context.commit('setThreads',threads);
                    context.commit('setItems',{resource:'threads',items:threads});
                    return context.state.threads
                })
        }
    },
    //Simple functions to mutate the state
    mutations:{
        //Lo vamos a sustituir por la siguiente sintaxis
        setItems(state, {resource,items}){
            state[resource]=items
        },
        setItem(state, {resource,item}){            
            state[resource]=item
        }
        //Esta era la explicacion sencilla, nos quedamos con la generica

        // setMeetups(state, meetups){
        //     state.meetups=meetups
        // },
        // setCategories(state, categories){
        //     state.categories=categories
        // },
        // setMeetup(state, meetup){
        //     state.meetup=meetup
        // },
        // setThreads(state, threads){
        //     state.threads=threads
        // }
    }
})
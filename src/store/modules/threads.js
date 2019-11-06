import axios from 'axios'

export default{
    namespaced: true,
    
    state:{
        items:[]
    },
    getters:{

    },
    actions:{
        fetchThreads(context, meetupId){

            //Inicializamos los threads para que no se carguen los de la vez anterior hasta que se cargan los nuevos
            context.commit('setItems',{resource:'threads',items:{}}, {root:true});

            //En este caso tenemos que ver lo que ocurre en la funcion definida en el servidor. Pasamos como parametro con el signo ?
            axios.get(`/api/v1/threads?meetupId=${meetupId}`)
                .then(res=>{
                    const threads=res.data
                    // context.commit('setThreads',threads);
                    context.commit('setItems',{resource:'threads',items:threads}, {root:true});
                    return context.state.items
                })
        }
    }
}
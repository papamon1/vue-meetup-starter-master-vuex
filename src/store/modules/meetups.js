import axios from 'axios'

export default{
    namespaced: true,

    state:{
        items:[],
        item:{}
    },    
    actions:{
        fetchMeetups(context){
            context.commit('setItems',{resource:'meetups',items:[]}, {root:true});
            axios.get('/api/v1/meetups')
            .then(res=>{
                const meetups = res.data;
                // context.commit('setMeetups',meetups);
                context.commit('setItems',{resource:'meetups',items:meetups}, {root:true});
                return context.state.items
            })
        },
        fetchMeetupById(context,meetupId){
            // MEJORA
            //Cuando cargamos una página de detalle después de haber cargado antes otra en algun momento,
            //por unos segundos se muestran los datos de la anterior meetup, hasta que se fecthean los nuevos y se cargan
            //Por eso, cuando se hace la llamada, vamos a eliminar o cargar datos vacíos hasta que se complete la carga de los nuevos

            context.commit('setItem',{resource:'meetups',item:{}}, {root:true});

            //En este caso tenemos que ver lo que ocurre en la funcion definida en el servidor. Pasamos como parametro con el signo ?
            return axios.get(`/api/v1/meetups/${meetupId}`)
            .then(res=>{                
                const meetup=res.data
                // context.commit('setMeetup',meetup);
                context.commit('setItem',{resource:'meetups',item:meetup}, {root:true});
                return context.state.item
            })
        }
    }
}
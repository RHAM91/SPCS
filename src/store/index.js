import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {IP, PUERTO} from '@/config/parametros'
import VuexPersist from 'vuex-persist'
import { minix } from '../components/functions/alertas'


Vue.use(Vuex)

const vuexPersist = new VuexPersist({
    key: 'kat',
    storage: window.localStorage,
    reducer: state => ({
  
      token: state.token,
      permisos: state.permisos,
      t2: state.t2,
      socket: state.socket,
      datos_personales: state.datos_personales,
      datos_iglesia: state.datos_iglesia

    }) 
  })
  

// FUNCIONES AUXILIARES

function filtrar_acentos(input){
    var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
    var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
    for (var i = 0; i < acentos.length; i++) {
        input = input.replace(acentos.charAt(i), original.charAt(i)).toLowerCase();
    };
    return input;
}


// FIN DE LAS FUNCIONES AUXILIARES

export default new Vuex.Store({
  state: {
    //-----> sistema
      token: '',
      t2: '',
      socket: '',
      permisos:  {},
      tipo: '',
      loading_icono: false,
      rutas:[
        //{api:'profesiones', set: 'set_profesiones'},
        {api:'permisos', set: 'set_permisos'},
        // {api:'ancianos', set: 'set_ancianos'},
        // {api:'estadocivil', set: 'set_estadocivil'},
        // {api:'lugaresdiscipulado', set: 'set_lugares_discipulado'},
        // {api:'asignacion_entrevistas', set: 'set_entrevistas'}
      ],

    //-----> produccion
      datos_iglesia: '',
      datos_personales: '',
      formulario_inscripcion: [],
      profesiones: [],
      ancianos: [],
      estadocivil: [],
      datos_lugares_discipulado: [],
      datos_entrevistas: [],

      
      //paises: [],
      filtro_busqueda: '',

    //----> filtros

    filtros:{
        filtro_alumno: ''
    }

  },
  mutations: {
    //------> SISTEMA
    set_token(state, token){
        let token_formateado = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        state.token = token_formateado
    },
    set_socket(state, socket){
        state.socket = socket
    },
    set_permisos(state, data){
        state.permisos = data
    },
    set_tipousuario(state, data){
        state.tipo = data
    },
    
    // ------> PRODUCCION

   
    set_miembros(state, data){
        state.miembros = data
    },
    set_loading(state, data){
        state.loading_icono = data
    },
    set_profesiones(state, data){
        state.profesiones = data
    },
    set_ancianos(state, data){
        state.ancianos = data
    },
    set_estadocivil(state, data){
        state.estadocivil = data
    },
    set_datos_personales(state, data){
        state.datos_personales = data
    },
    set_datos_iglesia(state, data){
        state.datos_iglesia = data
    },
    set_lugares_discipulado(state,data){
        state.datos_lugares_discipulado = data
    },
    set_entrevistas(state, data){
        state.datos_entrevistas = data
    },

    //------> FILTROS

    set_filtro_alumnos(state, query){
        state.filtros.filtro_alumno = query
    },

  },
  actions: {
    get_token({commit}, data){
        commit('set_token', data)
    },
    async saveData({commit, state, dispatch}, data){
        try {
            const r = await axios.post(`http://${IP}:${PUERTO}/api/${data.api}`, data.formulario, state.token)

            commit('set_loading', true)

            if (r.status == 200) {

                minix({icon: 'success', mensaje: r.data.message, tiempo: 2000})
                
                if (data.pull == true) {
                    dispatch('notificacion', data.api)
                }

                commit('set_loading', false)

            }else{
                minix({icon: 'info', mensaje: r.data.message, tiempo: 6000})
                commit('set_loading', false)
                return 'YE'
            }
        } catch (e) {
            if(e.response.status == 403){
                minix({icon: 'error', mensaje: e.response.data.message, tiempo: 2000})
            }else{
                minix({icon: 'info', mensaje: e.response.data.message, tiempo: 5000})
            }
        }
    },
    async getData({commit, state, dispatch}, data){
        try {
            
            const r = await axios.get(`http://${IP}:${PUERTO}/api/${data.api}`, state.token)

            commit('set_loading', true)

            if (r.status == 200) {
            
                commit('set_loading', false)
                return r.data

            }else{
                minix({icon: 'info', mensaje: r.data.message, tiempo: 2000})
                commit('set_loading', false)
            }
            
        } catch (e) {
            if(e.response.status == 403){
                minix({icon: 'error', mensaje: e.response.data.message, tiempo: 3000})
                return []
            }else{
                minix({icon: 'info', mensaje: e.response.data.message, tiempo: 5000})
            }
        }
    },
    async deleteData({commit, state, dispatch}, data){
        try {

            commit('set_loading', true)
            
            const r = await axios.delete(`http://${IP}:${PUERTO}/api/${data.api}/${data.id}`, state.token)

            if(r.status == 200){
                minix({icon: 'success', mensaje: r.data.message, tiempo: 2000})

                if(data.pull == true){
                    dispatch('notificacion', data.api)
                }

                commit('set_loading', false)

            }else{
                minix({icon: 'info', mensaje: r.data.message, tiempo: 3000})
                commit('set_loading', false)
            }

        } catch (e) {
            if(e.response.status == 403){
                minix({icon: 'error', mensaje: e.response.data.message, tiempo: 3000})
            }else{
                minix({icon: 'info', mensaje: e.response.data.message, tiempo: 5000})
            }
        }
    },
    async sfile({state, commit}, data){
           
        try {

            commit('set_loading', true)

            const formData = new FormData()
            formData.append('image', data.evento)

            for (let i = 0; i < data.campos.length; i++) {
                const e = data.campos[i];
                
                formData.append(e.campo, e.payload)
            }

            const archivo = await axios.post(`http://${IP}:${PUERTO}/api/${data.api}`, formData, state.token)
      
            minix({icon: 'success', mensaje: archivo.data.message, tiempo: 2000})
            commit('set_loading', false)
            

        } catch (e) {
            if(e.response.status == 500){
                minix({icon: 'error', mensaje: e.response.data.message, tiempo: 3000})
            }else{
                minix({icon: 'info', mensaje: e.response.data.message, tiempo: 5000})
            }
        }


    },
    async updateData({commit, state, dispatch}, data){

        try {
            
            commit('set_loading', true)
            
            if(data.modo == 'param'){
                const r = await axios.put(`http://${IP}:${PUERTO}/api/${data.api}/${data.id}`, data.formulario, state.token)

                if (r.status == 200) {
                    minix({icon: 'success', mensaje: r.data.message, tiempo: 2000})
    
                    if(data.pull == true){
                        dispatch('notificacion', data.api)
                    }
    
                    commit('set_loading', false)
                }else{
                    minix({icon: 'info', mensaje: r.data.message, tiempo: 3000})
                    commit('set_loading', false)
                }

            }else if(data.modo == 'query'){

                // parametros son
                // let f = {
                //     api: '',
                //     id: '', // si el modo es query entonces no se coloca id
                //     modo: '',
                //     pull: '',
                //     formulario: ''
                // }

                const r = await axios.put(`http://${IP}:${PUERTO}/api/${data.api}`, data.formulario, state.token)

                if (r.status == 200) {
                    minix({icon: 'success', mensaje: r.data.message, tiempo: 2000})
    
                    if(data.pull == true){
                        if (data.modo == 'query') {

                            let iapi = data.api.split('/')[0]

                            dispatch('notificacion', iapi)

                        }else if(data.modo == 'param'){

                            dispatch('notificacion', data.api)
                        }
                    }
    
                    commit('set_loading', false)
                }else{
                    minix({icon: 'info', mensaje: r.data.message, tiempo: 2000})
                    commit('set_loading', false)
                }

            }else{
                return 'Error - revisar stores de vuex'
            }


           

        } catch (e) {
            if(e.response.status == 403){
                minix({icon: 'error', mensaje: e.response.data.message, tiempo: 3000})
            }else{
                minix({icon: 'info', mensaje: e.response.data.message, tiempo: 5000})
            }
        }

    },
    async getPermission({commit, state, dispatch}){ // esta funcion es para usuario normal, es decir para poder usar los permisos para ver u ocultar algun modulo
        try {
            
            const r = await axios.get(`http://${IP}:${PUERTO}/api/permisos`, state.token)

            commit('set_tipousuario', r.data.tipo)
            commit('set_permisos', r.data)


        } catch (e) {
            if(e.response.status == 403){
                minix({icon: 'error', mensaje: e.response.data.message, tiempo: 2000})
            }else{
                minix({icon: 'info', mensaje: e.response.data.message, tiempo: 5000})
            }
        }
    },
    async pullData({dispatch}, data){
        dispatch('notificacion', data.api)
    },
    convertir({commit, state, dispatch}, data){
        let p = state[data.array].filter(z => z[data.valor] == data.parametro)
        return p
    },
    async ejecutar_ruta({commit, state}, data){

      try {

            commit('set_loading', true)

            const datos = await axios.get(`http://${IP}:${PUERTO}/api/${data.api}`, state.token)
            
            if (datos.status == 200) {
                
                if (datos.data.message) {
                    commit(data.set, [])
                    commit('set_loading', false)
                }else{
                    commit(data.set, datos.data)
                    commit('set_loading', false)
                }

            }

      } catch (e) {

            console.log(e)

      }

    },
    notificacion({state}, modulo){ // al guardar, actualizar u borrar envia señal para que todos los clientes actualicen

        let bits = {
            modulo
        }

        state.socket.client.emit('news', bits)
    },
    async receptor({state, dispatch}){ // recibe la orden de que modulo actualizar, descarga los datos nuevos
        state.socket.client.on('modulo', (mod)=>{

            let filtro = state.rutas.filter(ruta => ruta.api == mod)
            
            let data = {
                api: filtro[0].api,
                set: filtro[0].set
            }


            dispatch('ejecutar_ruta', data)
        })
    },
    async descargar_datos({commit, state, dispatch}, socket){ // Descarga todos los datos predefinios al iniciar la app

        commit('set_socket', socket)

        socket.client.on('inicializacion', (dat) =>{

            console.log(dat)

            for (let i = 0; i < state.rutas.length; i++) {

                const e = state.rutas[i];

                dispatch('ejecutar_ruta', e)

            }
        })
    }
    

  },
  getters:{
  },
  plugins: [vuexPersist.plugin],
  modules: {
  }
})

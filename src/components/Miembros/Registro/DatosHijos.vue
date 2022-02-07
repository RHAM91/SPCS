<template>
    <b-container fluid="">
        <b-row>
            <b-col sm="2" class="mt-3">
                <b-button type="button" size="sm" variant="info" block style="margin-top: 31px;" @click="abrirModalBuscarMiembro('padre')">Buscar padre</b-button>
            </b-col>
            <b-col sm="10" class="mt-3">
                <label for="">Nombre del padre</label>
                <b-form-input type="text" v-model="nombre_padre" readonly size="sm"></b-form-input>
            </b-col>

            <b-col sm="2" class="mt-3">
                <b-button type="button" size="sm" variant="info" block style="margin-top: 31px;" @click="abrirModalBuscarMiembro('madre')">Buscar madre</b-button>
            </b-col>
  
            <b-col sm="10" class="mt-3">
                <label for="">Nombre de la madre</label>
                <b-form-input type="text" v-model="nombre_madre" readonly size="sm"></b-form-input>
            </b-col>
            
            <b-col sm="7" class="mt-4">
                <label for="">Nombre del hijo (a)</label>
                <b-form-input type="text" v-model="nombre_hijo" id="nombrehijo" size="sm" autocomplete="off"></b-form-input>
            </b-col>
            <b-col sm="3" class="mt-4">
                <label for="">Fecha de nacimiento</label>
                <b-form-input type="date" v-model="fecha_de_nacimiento" size="sm" autocomplete="off"></b-form-input>
            </b-col>
            <b-col sm="2" class="mt-4">
                <b-button type="button" size="sm" block style="margin-top:31px;" variant="warning" @click="agregar_hijos">Agregar</b-button>
            </b-col>

            <b-col sm="12" class="mt-4">
                <table class="table table-sm table-striped table-bordered" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th style="width: 50%;">
                                Nombre
                            </th>
                            <th style="width: 35%;">
                                Fecha de nacimiento
                            </th>
                            <th style="width: 15%;text-align: center;">
                                ...
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in hijos" :key="index">
                            <td>
                                {{item.nombre}}
                            </td>
                            <td>
                                {{item.fecha_de_nacimiento | nFecha}}
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" variant="danger" size="sm" @click="eliminarFila(index)"><i class="fas fa-trash-alt"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
            <b-col v-if="mostrar_btn_guardar" sm="12" class="mt-2 d-flex flex-row-reverse">
                <b-button type="button" size="sm" variant="success" @click="guardar">Guardar</b-button>
            </b-col>
        </b-row>

        <BuscarMiembro v-if="modalBuscarPadre" v-on:salir="cerrarModalBuscarPadre" v-on:seleccion="insertarDatoPadre" />
        <BuscarMiembro v-if="modalBuscarMadre" v-on:salir="cerrarModalBuscarMadre" v-on:seleccion="insertarDatoMadre" />

    </b-container>
</template>

<script>
import moment from 'moment'
import { minix } from '../../functions/alertas'

import BuscarMiembro from './BuscarMiembro.vue'
import { mapActions } from 'vuex'

export default {
    name: 'DatosHijos',
    components: {
        BuscarMiembro
    },
    filters:{
        nFecha: function(val){
            return moment(val).format('DD/MM/YYYY')
        }
    },
    data() {
        return {
            hijos: [],
            mostrar_btn_guardar: false,
            modalBuscarPadre: false,
            modalBuscarMadre: false,

            cui_padre: '',
            nombre_padre: '',
            cui_madre: '',
            nombre_madre: '',

            nombre_hijo: '',
            fecha_de_nacimiento: ''
        }
    },
    methods: {
        agregar_hijos(){

            if (this.nombre_hijo == '' || this.fecha_de_nacimiento ==  '') {
                minix({icon: 'error', mensaje: 'Verifica si te hace falta nombre o fecha para agregar registro', tiempo: 3000})
            }else{
                let f = {
                    nombre: this.nombre_hijo.toUpperCase(),
                    fecha_de_nacimiento: this.fecha_de_nacimiento
                }


                this.hijos.push(f)

                this.nombre_hijo = ''
                this.fecha_de_nacimiento = ''

                document.getElementById('nombrehijo').focus()
            }

        },
        eliminarFila(id){
            this.hijos.splice(id, 1)
        },
        abrirModalBuscarMiembro(persona){
            if (persona == 'padre') {
                this.modalBuscarPadre = true
                this.modalBuscarMadre = false
            }else{
                this.modalBuscarPadre = false
                this.modalBuscarMadre = true
            }
        },
        cerrarModalBuscarPadre(){
            this.modalBuscarPadre = false
        },
        cerrarModalBuscarMadre(){
            this.modalBuscarMadre = false
        },
        insertarDatoPadre(item){
            this.cui_padre = item.dpi
            this.nombre_padre = item.nombre
        },
        insertarDatoMadre(item){
            this.cui_madre = item.dpi
            this.nombre_madre = item.nombre
        },
        async guardar(){

            if (this.cui_padre == '' && this.cui_madre == '') {
                minix({icon: 'error', mensaje: 'Debe haber por lo menos uno de los padres', tiempo: 3000})
            }else{
                if (this.hijos == 0) {
                    minix({icon: 'error', mensaje: 'Debe registrarse 1 hijo al menos', tiempo: 3000})
                }else{
                    let f = {
                        api: 'miembros/g/datos_hijos',
                        pull: false,
                        formulario: {
                            id_padre: this.cui_padre,
                            id_madre: this.cui_madre,
                            hijos: this.hijos
                        }
                    }
        
                    await this.saveData(f)
                    this.cui_padre = ''
                    this.cui_madre = ''
                    this.nombre_padre = ''
                    this.nombre_madre = ''
                    this.nombre_hijo = ''
                    this.fecha_de_nacimiento = ''
                    this.hijos = []
                }
            }

        },
        ...mapActions(['saveData'])
    },
    watch: {
        hijos: function(val){
            if (val.length == 0) {
                this.mostrar_btn_guardar = false
            }else{
                this.mostrar_btn_guardar = true
            }
        }
    },
}
</script>

<style>
    .titulo_datoshijo{
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 19px;
    }

        .seccion_datoshijo{
            margin-top: 5px;
        }
</style>
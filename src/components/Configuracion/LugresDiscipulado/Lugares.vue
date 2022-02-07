<template>
     <b-container fluid>
         <form @submit.prevent="guardar">
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h3>
                        Lugares de discipulado
                    </h3>
                </b-col>
                <b-col sm="6" class="mt-3">
                    Región
                    <select class="form-control form-control-sm" required v-model="region">
                        <option value="">Seleccion</option>
                        <option value="1">Región 1</option>
                        <option value="2">Región 2</option>
                        <option value="3">Región 3</option>
                        <option value="4">Región 4</option>
                        <option value="5">Región 5</option>
                    </select>
                </b-col>
                <b-col sm="6" class="mt-3">
                    Grupo
                    <select class="form-control form-control-sm" required v-model="grupo">
                        <option value="">Seleccion</option>
                        <option value="1">Grupo 1</option>
                        <option value="2">Grupo 2</option>
                        <option value="3">Grupo 3</option>
                        <option value="4">Grupo 4</option>
                        <option value="5">Grupo 5</option>
                        <option value="6">Grupo 6</option>
                        <option value="7">Grupo 7</option>
                        <option value="8">Grupo 8</option>
                        <option value="9">Grupo 9</option>
                        <option value="10">Grupo 10</option>
                        <option value="11">Grupo 11</option>
                        <option value="12">Grupo 12</option>
                        <option value="13">Grupo 13</option>
                        <option value="14">Grupo 14</option>
                    </select>
                </b-col>
                <b-col sm="6" class="mt-3">
                    Discipulador
                    <b-form-input type="text" v-model="discipulador" autocomplete="off" required size="sm"></b-form-input>
                </b-col>
                <b-col sm="6" class="mt-3">
                    Anfitrión
                    <b-form-input type="text" v-model="anfitrion" autocomplete="off" required size="sm"></b-form-input>
                </b-col>
                <b-col sm="3" class="mt-3">
                    Teléfono
                    <b-form-input type="text" v-model="telefono" autocomplete="off" required size="sm"></b-form-input>
                </b-col>
                <b-col sm="7" class="mt-3">
                    Dirección
                    <b-form-input type="text" v-model="direccion" autocomplete="off" required size="sm"></b-form-input>
                </b-col>
                <b-col sm="2" class="mt-3 d-flex flex-row-reverse">
                    <b-button type="submit" variant="success" block style="margin-top: 24px;" size="sm">Guardar</b-button>
                </b-col>
                <b-col sm="12" class="mt-4">
                    <table class="table table-sm table-striped table-bordered" style="font-size: 11px;">
                        <thead>
                            <tr>
                                <th style="width: 5%;text-align: center;">
                                    Región
                                </th>
                                <th style="width: 5%;text-align: center;">
                                    Grupo
                                </th>
                                <th style="width: 15%;">
                                    Discipulador
                                </th>
                                <th style="width: 15%;">
                                    Anfitrión
                                </th>
                                <th style="width: 40%;">
                                    Dirección
                                </th>
                                <th style="width: 10%;text-align: center;">
                                    Teléfono
                                </th>
                                <th style="width: 10%;text-align: center;">
                                    ...
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in datos_lugares_discipulado" :key="index">
                                <td style="text-align: center;">
                                    {{item.region}}
                                </td>
                                <td style="text-align: center;">
                                    {{item.grupo}}
                                </td>
                                <td>
                                    {{item.discipulador}}
                                </td>
                                <td>
                                    {{item.anfitrion}}
                                </td>
                                <td>
                                    {{item.direccion}}
                                </td>
                                <td style="text-align: center;">
                                    {{item.telefono}}
                                </td>
                                <td style="text-align: center;">
                                    <b-button type="button" variant="primary" style="margin-right: 10px;" size="sm" @click="abrirModal(item)"><i class="fas fa-pen"></i></b-button>
                                    <b-button type="button" variant="danger" size="sm" @click="borrar(item.id)"><i class="fas fa-trash-alt"></i></b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>
         </form>

        <Actualizar v-if="modal_actualizar" :itemLugar="item" v-on:salir="cerrarModal" />

     </b-container>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import { pregunta } from '../../functions/alertas'

import Actualizar from './Actualizar.vue'

export default {
    name: 'LugaresDiscipulado',
    components: {
        Actualizar
    },
    computed: {
        ...mapState(['datos_lugares_discipulado'])
    },
    data() {
        return {
            modal_actualizar: false,
            item: {},

            region: '',
            grupo: '',
            discipulador: '',
            anfitrion: '',
            telefono: '',
            direccion: '',

        }
    },
    methods: {
        async guardar(){
            let f = {
                api: 'lugaresdiscipulado',
                pull: true,
                formulario: {
                    region: this.region,
                    grupo: this.grupo,
                    discipulador: this.discipulador.toUpperCase(),
                    anfitrion: this.anfitrion.toUpperCase(),
                    telefono: this.telefono,
                    direccion: this.direccion.toUpperCase()
                }
            }

            await this.saveData(f)

            this.region = ''
            this.grupo = ''
            this.discipulador = ''
            this.anfitrion = ''
            this.telefono = ''
            this.direccion = ''
        },
        async borrar(id){
             pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let f = {
                        api: 'lugaresdiscipulado',
                        id,
                        pull: true
                    }

                    await this.deleteData(f)
                }
            })
        },
        abrirModal(item){
            this.modal_actualizar = true
            this.item = item
        },
        cerrarModal(){
            this.modal_actualizar = false
        },
        ...mapActions(['saveData', 'deleteData'])
    },
}
</script>

<style>

</style>
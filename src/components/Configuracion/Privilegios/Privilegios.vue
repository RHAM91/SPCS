<template>
    <b-container fluid="">
        <form @submit.prevent="guardar">
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h3>
                        Privilegios
                    </h3>
                </b-col>
                <b-col sm="10" class="mt-4">
                    <label for="">Nombre del privilegio</label>
                    <b-form-input type="text" size="sm" v-model="nombreprivilegio" autocomplete="off" required></b-form-input>
                </b-col>
                <b-col sm="2" class="mt-4">
                    <b-button type="submit" block size="sm" style="margin-top: 31px;" variant="success">Guardar</b-button>
                </b-col>
                <b-col sm="12" class="mt-4">
                    <table class="table table-sm table-striped table-bordered" style="font-size: 12px;">
                        <thead>
                            <tr>
                                <th style="width: 80%;">
                                    Privilegio
                                </th>
                                <th style="text-align: center;width: 20%;">
                                    ...
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in privilegios" :key="index">
                                <td>
                                    {{item.privilegio}}
                                </td>
                                <td style="text-align: center;">
                                    <b-button type="button" size="sm" style="margin-right: 10px;" variant="primary" @click="AbrirModalActualizar(item)"><i class="fas fa-pencil-alt"></i></b-button>
                                    <b-button type="button" size="sm" variant="danger" @click="Eliminar(item.id)"><i class="fas fa-trash-alt"></i></b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>
        </form>

        <ModalActualizar v-if="actualizar" :itemPrivilegio="itemPrivilegio" v-on:salir="cerrarModalActualizar" />

    </b-container>
</template>

<script>

import { IP, PUERTO } from '@/config/parametros'
import axios from 'axios'
import { mapActions } from 'vuex'
import { pregunta, minix } from '@/components/functions/alertas'

import ModalActualizar from './Actualizar.vue'

export default {
    name: 'Privilegios',
    components:{
        ModalActualizar
    },
    data() {
        return {
            privilegios: [],
            actualizar: false,
            itemPrivilegio: '',
            nombreprivilegio: ''
        }
    },
    methods: {
        async obtenerPrivigelios(){
            
            let data = {
                api: 'privilegios'
            }

            let f = await this.getData(data)
            this.privilegios = f
            
        },
        async guardar(){
            let data = {
                api: 'privilegios',
                pull: false,
                formulario: {
                    privilegio: this.nombreprivilegio.toUpperCase()
                }
            }

            await this.saveData(data)
            await this.obtenerPrivigelios()
        },
        async Eliminar(id){

            pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let f = {
                        api: 'privilegios',
                        id,
                        pull: false
                    }

                    await this.deleteData(f)
                    await this.obtenerPrivigelios()
                }
            })
            
        },
        AbrirModalActualizar(itp){
            this.itemPrivilegio = itp
            this.actualizar = true

        },
        cerrarModalActualizar(){
            this.actualizar = false
            this.obtenerPrivigelios()
        },
        ...mapActions(['deleteData', 'saveData', 'getData'])
    },
    mounted() {
        this.obtenerPrivigelios()
    },
}
</script>

<style>

</style>
<template>
    <b-container fluid="">
        <form @submit.prevent="guardar">
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h3>
                        Estado civil
                    </h3>
                </b-col>
                <b-col sm="10" class="mt-4">
                    <label for="">Estado</label>
                    <b-form-input type="text" id="recv_estado" size="sm" v-model="recv_estadocivil" autocomplete="off" required></b-form-input>
                </b-col>
                <b-col sm="2" class="mt-4">
                    <b-button type="submit" block size="sm" style="margin-top: 31px;" variant="success">Guardar</b-button>
                </b-col>
                <div class="marco">
                    <b-col sm="12" class="mt-4">
                        <table class="table table-sm table-striped table-bordered" style="font-size: 12px;">
                            <thead>
                                <tr>
                                    <th style="width: 80%;">
                                        Estado
                                    </th>
                                    <th style="text-align: center;width: 20%;">
                                        ...
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in estadocivil" :key="index">
                                    <td>
                                        {{item.estado}}
                                    </td>
                                    <td style="text-align: center;">
                                        <b-button type="button" size="sm" style="margin-right: 10px;" variant="primary" @click="AbrirModalActualizar(item)"><i class="fas fa-pencil-alt"></i></b-button>
                                        <b-button type="button" size="sm" variant="danger" @click="Eliminar(item.id)"><i class="fas fa-trash-alt"></i></b-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </b-col>
                </div>
            </b-row>
        </form>

        <ModalActualizar v-if="actualizar" :itemEstado="itemEstado" v-on:salir="cerrarModalActualizar" />

    </b-container>
</template>

<script>

import { IP, PUERTO } from '@/config/parametros'
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import { pregunta, minix } from '@/components/functions/alertas'

import ModalActualizar from './Actualizar.vue'

export default {
    name: 'EstadoCivil',
    computed: {
        ...mapState(['estadocivil'])
    },
    components:{
        ModalActualizar
    },
    data() {
        return {
            actualizar: false,
            itemEstado: '',
            recv_estadocivil: ''
        }
    },
    methods: {
        
        async guardar(){
            let data = {
                api: 'estadocivil',
                pull: true,
                formulario: {
                    estado: this.recv_estadocivil.toUpperCase()
                }
            }

            await this.saveData(data)
            this.recv_estadocivil = ''
        },
        async Eliminar(id){

            pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let f = {
                        api: 'estadocivil',
                        id,
                        pull: true
                    }

                    await this.deleteData(f)
                    document.getElementById('recv_estado').focus()
                }
            })
            
        },
        AbrirModalActualizar(itp){
            this.itemEstado = itp
            this.actualizar = true

        },
        cerrarModalActualizar(){
            this.actualizar = false
        },
        ...mapActions(['deleteData', 'saveData'])
    },
    mounted() {
        document.getElementById('recv_estado').focus()
    },
}
</script>

<style>

</style>
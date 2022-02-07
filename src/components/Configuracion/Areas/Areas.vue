<template>
    
    <b-container fluid="">
        <form @submit.prevent="guardar">
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h3>
                        Áreas
                    </h3>
                </b-col>
                <b-col sm="10" class="mt-4">
                    <label for="">Nombre del área</label>
                    <b-form-input type="text" size="sm" v-model="nombrearea" autocomplete="off" required></b-form-input>
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
                                        Nombre del área
                                    </th>
                                    <th style="text-align: center;width: 20%;">
                                        ...
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in areas" :key="index">
                                    <td>
                                        {{item.area}}
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

        <ModalActualizar v-if="actualizar" :itemArea="itemArea" v-on:salir="cerrarModalActualizar" />

    </b-container>
</template>

<script>

import { IP, PUERTO } from '@/config/parametros'
import axios from 'axios'
import { mapActions } from 'vuex'
import { pregunta } from '@/components/functions/alertas'

import ModalActualizar from './Actualizar.vue'

export default {
    name: 'Areas',
    components:{
        ModalActualizar
    },
    data() {
        return {
            areas: [],
            actualizar: false,
            itemArea: '',
            nombrearea: ''
        }
    },
    methods: {
        async obtenerAreas(){
            let l = await axios.get(`http://${IP}:${PUERTO}/api/areas`, this.$store.state.token)
            this.areas = l.data
        },
        async guardar(){
            let data = {
                api: 'areas',
                pull: false,
                formulario: {
                    area: this.nombrearea.toUpperCase()
                }
            }

            await this.saveData(data)
            await this.obtenerAreas()
        },
        async Eliminar(id){

            pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let f = {
                        api: 'areas',
                        id,
                        pull: false
                    }

                    await this.deleteData(f)
                    await this.obtenerAreas()
                }
            })
            
        },
        AbrirModalActualizar(itp){
            this.itemArea = itp
            this.actualizar = true

        },
        cerrarModalActualizar(){
            this.actualizar = false
            this.obtenerAreas()
        },
        ...mapActions(['deleteData', 'saveData'])
    },
    mounted() {
        this.obtenerAreas()
    },
}
</script>

<style>

</style>
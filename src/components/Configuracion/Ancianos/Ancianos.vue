<template>
    <b-container fluid="">
        <form @submit.prevent="guardar">
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h3>
                        Ancianos
                    </h3>
                </b-col>
                <b-col sm="10" class="mt-4">
                    <label for="">Nombre del anciano</label>
                    <b-form-input type="text" size="sm" v-model="nombreanciano" id="nombreanciano" autocomplete="off" required></b-form-input>
                </b-col>
                <b-col sm="2" class="mt-4">
                    <b-button type="submit" block size="sm" style="margin-top: 31px;" variant="success">Guardar</b-button>
                </b-col>
                <b-col sm="12" class="mt-4">
                    <table class="table table-sm table-striped table-bordered" style="font-size: 12px;">
                        <thead>
                            <tr>
                                <th style="width: 80%;">
                                    Nombre del anciano
                                </th>
                                <th style="text-align: center;width: 20%;">
                                    ...
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in ancianos" :key="index">
                                <td>
                                    {{item.anciano}}
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

        <ModalActualizar v-if="actualizar" :itemAnciano="itemAnciano" v-on:salir="cerrarModalActualizar" />

    </b-container>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import { pregunta } from '@/components/functions/alertas'

import ModalActualizar from './Actualizar.vue'

export default {
    name: 'Ancianos',
    computed: {
        ...mapState(['ancianos'])
    },
    components:{
        ModalActualizar
    },
    data() {
        return {
            //ancianos: [],
            actualizar: false,
            itemAnciano: '',
            nombreanciano: ''
        }
    },
    methods: {
        async guardar(){
            let data = {
                api: 'ancianos',
                pull: true,
                formulario: {
                    anciano: this.nombreanciano.toUpperCase()
                }
            }

            await this.saveData(data)
            this.nombreanciano = ''
            document.getElementById('nombreanciano').focus()
        },
        async Eliminar(id){

            pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let f = {
                        api: 'ancianos',
                        id,
                        pull: true
                    }

                    await this.deleteData(f)
                }
            })
            
        },
        AbrirModalActualizar(itp){
            this.itemAnciano = itp
            this.actualizar = true

        },
        cerrarModalActualizar(){
            this.actualizar = false
        },
        ...mapActions(['deleteData', 'saveData', 'getData'])
    },
    mounted() {
        document.getElementById('nombreanciano').focus()
    },
}
</script>

<style>

</style>
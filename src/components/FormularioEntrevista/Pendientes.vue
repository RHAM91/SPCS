<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12">
                <h3>
                    Pendientes
                </h3>
            </b-col>
            <b-col sm="12" class="mt-3">
                <table class="table table-sm table-striped table-bordered" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th style="width: 10%;">
                                DPI
                            </th>
                            <th style="width: 35%;">
                                Nombre
                            </th>
                            <th style="width: 15%;text-align: center;">
                                Teléfono
                            </th>
                            <th style="width: 15%;text-align: center;">
                                Fecha
                            </th>
                            <th style="width: 15%;text-align: center;">
                                Hora
                            </th>
                            <th style="width: 10%; text-align: center;">
                                ...
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in datos_entrevistas" :key="index">
                            <td>
                                {{item.dpi}}
                            </td>
                            <td>
                                {{item.nombre}}
                            </td>
                            <td style="text-align: center;">
                                {{item.telefono}}
                            </td>
                            <td style="text-align: center;">
                                {{item.fecha_asignacion | nFecha}}
                            </td>
                            <td style="text-align: center;">
                                {{item.hora_asignacion}}
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" variant="warning" size="sm" @click="abrir_modal_formulario(item)"><i class="far fa-eye"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>

        <Formulario v-if="modal_formulario" :itm="itemf" v-on:salir="cerrar_modal_formulario" />

    </b-container>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

import Formulario from './Formulario.vue'

export default {
    name: 'Pendientes',
    filters:{
        nFecha: function(val){
            return moment(val).format('DD/MM/YYYY')
        }
    },
    computed: {
        ...mapState(['datos_entrevistas'])
    },
    components: {
        Formulario
    },
    data() {
        return {
            modal_formulario: false,
            itemf: {}
        }
    },
    methods: {
        abrir_modal_formulario(item){
            this.itemf = item
            this.modal_formulario = true
        },
        cerrar_modal_formulario(){
            this.modal_formulario = false
        }
    },
}
</script>

<style>

</style>
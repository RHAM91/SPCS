<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-3">
                <h2>
                    Entrevistas pendientes de asignación
                </h2>
            </b-col>
            <b-col sm="12" class="mt-3">
                <table class="table table-sm table-striped table-bordered" style="font-size: 11px;">
                    <thead>
                        <tr>
                            <th style="width: 15%;">
                                DPI
                            </th>
                            <th style="width: 50%;">
                                Nombre
                            </th>
                            <th style="width: 15%;text-align: center;">
                                Teléfono
                            </th>
                            <th style="width: 10;text-align: center;">
                                Fecha
                            </th>
                            <th style="width: 10%;text-align: center;">
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
                                {{item.fecha | nFecha}}
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" variant="primary" style="margin-right: 10px;" size="sm" @click="abrir_modal_asignar(item)"><i class="fas fa-check"></i></b-button>
                                <b-button type="button" variant="danger" size="sm" @click="descartar(item.dpi)"><i class="fas fa-trash-alt"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>

        <ModalParaAsginar v-if="modal_asignar" :item="dpi" v-on:salir="cerrar_modal_asignacion" />


    </b-container>
</template>

<script>
import moment from 'moment'
import { mapActions, mapState } from 'vuex'

import ModalParaAsginar from './ModalParaAsginar.vue'
import { pregunta } from '../../functions/alertas'

export default {
    name: 'EntrevistasPendientes',
    computed: {
        ...mapState(['datos_entrevistas'])
    },
    components: {
        ModalParaAsginar
    },
    filters:{
        nFecha: function(val){
            return moment(val).format('DD/MM/YYYY')
        }
    },
    data() {
        return {
            dpi: '',
            modal_asignar: false,
        }
    },
    methods: {
        abrir_modal_asignar(dpi){
            this.dpi = dpi
            this.modal_asignar = true
        },
        cerrar_modal_asignacion(){
            this.modal_asignar = false
        },
        async descartar(dpi){
            pregunta({titulo: 'Seguro que deseas desartarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, descartarlo!'}, async (i) =>{

                if (i) {
                    let f = {
                        api: 'asignacion_entrevistas',
                        id: dpi,
                        pull: true,
                        modo: 'param',
                        formulario: {
                            asignado: 2
                        }
                    }

                    await this.updateData(f)
                }
            })
        },
        ...mapActions(['updateData'])
    }
}
</script>

<style>

</style>
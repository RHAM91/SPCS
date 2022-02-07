<template>
    <div class="marco_overflow">
        <b-container fluid>
            <b-row v-if="mostrar_datos_iglesia">
                <b-col sm="12" class="mt-3">
                    <table class="table table-sm table-striped table-bordered" style="font-size: 11px;">
                        <thead>
                            <tr>
                                <th>
                                    Datos
                                </th>
                                <th>---</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="width: 20%;">
                                    Entrevista por
                                </td>
                                <td style="width: 80%;">
                                    {{anciano}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 20%;">
                                    Fecha conversión
                                </td>
                                <td style="width: 80%;">
                                    {{recv.fechaconversion | nfecha}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 20%;">
                                    Lugar de conversión
                                </td>
                                <td style="width: 80%;">
                                    {{recv.lugardeconversion}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 20%;">
                                    ¿Bautizado en agua?
                                </td>
                                <td style="width: 80%;">
                                    {{recv.bautizmoagua | evalue}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 20%;">
                                    Fecha bautizmo en agua
                                </td>
                                <td style="width: 80%;">
                                    {{recv.fechabautizmoagua | nfecha}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 20%;">
                                    ¿Bautizmo en Espiritu Santo?
                                </td>
                                <td style="width: 80%;">
                                    {{recv.bautizmoespiritu | evalue}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 20%;">
                                    Fecha bautizmo en Espiritu Santo
                                </td>
                                <td style="width: 80%;">
                                    {{recv.fechabautizmoespiritu | nfecha}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 20%;">
                                    No. convertidos en el hogar
                                </td>
                                <td style="width: 80%;">
                                    {{recv.personasconvertidashogar}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 20%;">
                                    Congregación anterior
                                </td>
                                <td style="width: 80%;">
                                    {{recv.congregacionanterior}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 20%;">
                                    ¿Se discipula?
                                </td>
                                <td style="width: 80%;">
                                    {{recv.discipula | evalue}}
                                </td>
                            </tr>
                            <tr v-if="recv.discipula == 0">
                                <td style="width: 20%;">
                                    ¿Desea discipularse?
                                </td>
                                <td style="width: 80%;">
                                    {{recv.deseadiscipularse}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 20%;">
                                    Fecha incio de asistencia a la iglesia
                                </td>
                                <td style="width: 80%;">
                                    {{recv.fechaasistenciaiglesia | nfecha}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 20%;">
                                    ¿Tiene carta de recomendación?
                                </td>
                                <td style="width: 80%;">
                                    {{recv.cartarecomendacion | evalue}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 20%;">
                                    Motivo de traslado
                                </td>
                                <td style="width: 80%;">
                                    {{recv.motivotraslado}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 20%;">
                                    ¿Desea que lo visiten?
                                </td>
                                <td style="width: 80%;">
                                    {{recv.visita | evalue}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 20%;">
                                    ¿Labora actualmente?
                                </td>
                                <td style="width: 80%;">
                                    {{recv.laboraactualmente | evalue}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 20%;">
                                    Comentarios
                                </td>
                                <td style="width: 80%;">
                                    {{recv.comentarios}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row> 
            <NoEncontrado v-if="mostrar_datos_iglesia == false" :titulo="'No se encontraron registros'" />
        </b-container>
    </div>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'

import NoEncontrado from '@/components/others/NoEncontrado.vue'

export default {
    name: 'FichaInformacionIglesia',
    props: ['iMiembro'],
    components: {
        NoEncontrado
    },
    filters:{
        nfecha: function(val){
            return moment(val).format('DD/MM/YYYY')
        },
        evalue: function(val){
            return val == 1 ? 'Si' : 'No'
        }
    },
    data() {
        return {
            mostrar_datos_iglesia: false,
            edadactual: 0,
            nProfesion: '',
            recv: {},
            anciano: ''
        }
    },
    methods: {
        async convertirProfesion(id){
            let x = await this.convertir({array: 'ancianos', valor: 'id', parametro: id})
            this.anciano = x[0].anciano
        },
        async consultarDatosIglesia(){
            
            let f = await this.getData({api: `miembros/c/datosiglesia/${this.iMiembro.dpi}`})

            if (f.message) {
                if (f.message == 'NO EXISTEN REGISTROS') {
                    this.mostrar_datos_iglesia = false
                }
            }else{
                this.mostrar_datos_iglesia = true
                this.recv = f
                this.convertirProfesion(f.ancianoentrevisto)
            }

        },
        
        ...mapActions(['convertir', 'getData'])
    },
    mounted() {
        this.consultarDatosIglesia()
        
    },
}
</script>

<style>
    .marco_overflow{
        height: calc(100vh - 400px);
        overflow: auto;
    }
    
    
</style>